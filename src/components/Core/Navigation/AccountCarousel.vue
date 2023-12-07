<template>
    <div class="fb-account-carousel" :class="componentClasses.getClassByType('component')">
        <div class="fb-account-carousel-accounts-container">
            <button @click="prev()" v-if="!isMobile" :class="componentClasses.getClassByType('buttonPrimary')"></button>
            <div class="fb-account-carousel-accounts">
                <ul :class="transitionClasses">
                    <li
                        v-for="(account, index) in visibleAccounts"
                        :key="index"
                        @click.prevent="handleClick({ account: account, index: index })"
                        @touchstart="onTouchStart"
                        @touchend="onTouchEnd"
                        @touchmove="onTouchMove"
                        :class="{ 'fb-account-carousel-account-selected': account.id === currentAccount }"
                    >
                        <slot
                            name="account"
                            :totalMarketValueLabel="totalMarketValueLabel"
                            :changeInValueLabel="changeInValueLabel"
                            :accountNameLabel="accountNameLabel"
                            :accountNumberLabel="accountNumberLabel"
                            :account="account"
                            :props="props"
                            :showLabels="showLabels"
                        >
                            <div>
                                <h2>
                                    {{ formatCurrency(account.total_market_value) }} {{ account.id }}
                                    <span v-if="showLabels">{{ totalMarketValueLabel }}</span>
                                </h2>
                                <h3>
                                    <span>{{ formatCurrency(account.change_in_value_amt) }}({{ formatPercent(account.change_in_value_pct) }})</span>
                                    <span v-if="showLabels">{{ changeInValueLabel }}</span>
                                </h3>
                                <h4>
                                    {{ account.name }}
                                    <span v-if="showLabels">{{ accountNameLabel }}</span>
                                </h4>
                                <h5>
                                    {{ formatMask(account.number) }}
                                    <span v-if="showLabels">{{ accountNumberLabel }}</span>
                                </h5>
                            </div>
                        </slot>
                    </li>
                </ul> 
            </div>
            <button @click="next()" v-if="!isMobile" :class="componentClasses.getClassByType('buttonPrimary')"></button>
        </div>
        <ul class="fb-account-carousel-indicators">
            <li 
                v-for="(index) in accountsIndicators"
                :key="index" class="fb-account-carousel-indicator"
                :class="{ 'fb-account-carousel-indicator-highlight' : index === currentIndicator }"
            ></li>
        </ul>
    </div>
</template>
<script setup>
import * as componentClasses from "@/modules/useCommonCSS";
import { computed, ref, watch } from "vue";
import { findIndex } from "lodash";
import { isMobile } from "@/modules/useResponsive";
import { formatCurrency, formatPercent, formatMask } from "@/modules/useFormatter";


// eslint-disable-next-line no-unused-vars
const props = defineProps({
    /**
     * an object representing an account with the followiing props: number (account number), name (account nickname), total_market_value, change_in_value
     */
    accounts: {
        type: Array,
        default: () => [],
    },
    numVisibile: {
        type: Number,
        default: 3,
    },
    numScroll: {
        type: Number,
        default: 1,
    },
    showLabels: {
        type: Boolean,
        default: true,
    },
    defaultAccountId: {
        type: Number,
        default: null,
    },
    totalMarketValueLabel: {
        type: String,
        default: "Total Market Value",
    },
    changeInValueLabel: {
        type: String,
        default: "Change In Value",
    },
    accountNameLabel: {
        type: String,
        default: "Account Name",
    },
     accountNumberLabel: {
        type: String,
        default: "Account Number",
    },
});

const emit = defineEmits(["fb-account-carousel:click"])

watch(() => props.numScroll, () => {
    if (props.numScroll > props.numVisibile ) {
        throw("[Vue warn]: Invalid prop: numScroll may not be larger than numVisible");
    }
},{immediate:true});




const numVisibile = computed(() => {
    if (isMobile.value) {
        return 1;
    } else {
        return props.numVisibile;
    }
});

const numScroll = computed(() => {
    if (isMobile.value) {
        return 1;
    } else {
        return props.numScroll;
    }
});

const currentIndicator = ref(1);
const currentPage = ref(1);
const itemSize = ref(100 / numVisibile.value);
const prevItemPosition = ref(0);
const currentItemPosition = ref(0);
const startPos = ref({x: 0, y: 0});
const swipeThreshold = ref(itemSize.value);
// the account selected by a click event
const selectedAccount = ref(null);

// current active account set by a passed in prop or as a result of a click event
const currentAccount = computed( () => {
    if (selectedAccount.value) {
        return selectedAccount.value;
    }
    return parseInt(props.defaultAccountId);
});


const getItemSize = computed(() => {
    return `${itemSize.value}%`;
});


const getCurrentItemPosition = computed(() => {
    return `-${currentItemPosition.value}%`;
});

const visibleAccounts = computed(() => {
    return props.accounts;
});

const accountsIndicators = computed(() => {
    if (props.accounts.length/numScroll.value <= numVisibile.value ) {
        return Math.round(props.accounts.length/numScroll.value);
    }
    else {
        return props.accounts.length - numVisibile.value + 1;
    }
});

const transitionClasses = computed(() => {
    return [
        'carousel-enter-to',
        'carousel-enter-active',
    ];
});

// methods
const skipToAccount = () => {
    if (!currentAccount.value) {
        return
    }
    /**
     * find the index position the defaultAccountId is in
     * then figure out what page block it's in to finally figure out
     * how iterations to run next
     */
    const accountIndex = findIndex(props.accounts, { id: parseInt(currentAccount.value) });
    const skipTo = accountIndex - parseInt(props.numVisibile) + parseInt(props.numScroll);
    for(let i = 0; i < skipTo; i++) {
        next();
    }
}

const prev = () => {
    if (currentPage.value === 1) {
        return;
    }
    --currentPage.value;
    --currentIndicator.value;

    prevStep();
};
const next = () => {
    if (currentPage.value === accountsIndicators.value) {
        return;
    }
    ++currentPage.value;
    ++currentIndicator.value;
    nextStep();
};

const nextStep = () => {
    prevItemPosition.value = currentItemPosition.value;
    currentItemPosition.value = currentItemPosition.value + getSkipInterval();
}

const prevStep = () => {
    prevItemPosition.value = currentItemPosition.value;
    currentItemPosition.value = currentItemPosition.value - getSkipInterval();
}

const handleClick = (object) => {
    selectedAccount.value = object.account.id;
    emit("fb-account-carousel:click", object);
};

const onTouchStart = (e) => {
    const touchobj = e.changedTouches[0];
    startPos.value.x = touchobj.pageX;
    startPos.value.y = touchobj.pageY;
};

const onTouchEnd = (e) => {
   const touchobj = e.changedTouches[0];
   changePageOnTouch(e, touchobj.pageX - startPos.value.x);
};

const onTouchMove = (e) => {
    if (e.cancelable) {
        e.preventDefault();
    }
};

const changePageOnTouch = (e, diff) => {
    if (Math.abs(diff) > swipeThreshold.value) {
        if (diff < 0) {
            // left
            next();
        } else {
            // right
            prev();
        }
    }
};


const getSkipInterval = () => {
    return itemSize.value * numScroll.value;
}

watch(() => props.defaultAccountId, () => {
     skipToAccount();
},{immediate:true});

</script>
<style lang="scss" scoped>
.fb-account-carousel-accounts-container {
    display: flex;
    flex-direction: row;
}
.fb-account-carousel-accounts {
    overflow: hidden;
    width: 100%;
}
.fb-account-carousel-accounts ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    padding: 0;
}

.fb-account-carousel-accounts li {
    flex: 1 0 v-bind(getItemSize);
}
.fb-account-carousel-accounts-container + ul {
    display: flex;
    list-style: none;
}

.carousel-enter-to {
    transform: translate3d(v-bind(getCurrentItemPosition), 0px, 0px);
}
.carousel-enter-active {
    transition: transform 1.0s ease 0s;
}
.fb-account-carousel-indicators {
    padding: 0;
}
.fb-account-carousel-accounts-container button:first-child::before {
    content: "<";
}
.fb-account-carousel-accounts-container button:last-child::before {
    content: ">";
}
</style>
