<!-- eslint-disable vue/valid-template-root -->
<template>
    <Navbar />
    <main class="tw-mt-28 tw-px-8 md:tw-px-24">
        <section id="hero" class="tw-text-white tw-flex tw-h-screen tw-relative tw-overflow-hidden lg:tw-overflow-visible tw-w-full">
            <div class="tw-flex tw-relative tw-z-20 tw-flex-col tw-gap-6 tw-w-full lg:tw-w-1/2 xl:tw-mt-10">
                <div class="tw-text-center tw-leading-8 md:tw-leading-10 md:tw-text-left">
                    <div class="tw-inline-block">
                        <h1 class="tw-tracking-tight tw-inline tw-font-semibold tw-text-[2.5rem] lg:tw-text-5xl">Build&nbsp;</h1>
                        <h1 class="tw-tracking-tight tw-inline tw-font-semibold tw-from-[#FF1CF7] tw-to-[#b249f8] tw-text-[2.5rem] lg:tw-text-5xl tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-b">kicka#%&nbsp;</h1>
                    </div>
                    <h1 class="tw-tracking-tight tw-inline tw-font-semibold tw-text-[2.5rem] lg:tw-text-5xl">financial user interfaces regardless of your design experience.</h1>
                </div>
                <h2 class="tw-w-full md:tw-w-1/2 tw-my-2 tw-text-lg lg:tw-text-xl tw-font-normal tw-text-default-500 tw-block tw-max-w-full tw-text-center md:tw-text-left">Modern headless Vue UI library for building Self-Directed or Advisor frontends.</h2>
                <div class="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-gap-4">
                    <a class="button" href="/docs" role="button">Learn More</a>
                </div>
            </div>
            <div class="tw-hidden md:tw-flex tw-flex-col">
                <ComponentCloud />
            </div>
        </section>
        <section class="">
            <div class="tw-grid md:tw-grid-cols-3 md:tw-gap-4">
                <FeatureCard
                    title="Headless Components"
                    description="FinbloxUI is completely unstyled out-of-the-box. 
                    Components are packed with functionality and interaction events you can use to compose your application."
                    icon="\f121"
                />
                <FeatureCard
                    title="Total CSS Control"
                    description="FinbloxUI is unopinionated when it comes to presentational CSS. It's your application, it should be your design!
                    Take full control of the design with your own CSS, Bootstrap, Tailwind, whatever..."
                    icon="\f38b"
                    font="brands"
                />
                <FeatureCard
                    title="Bring Your Own Data (BYOD)"
                    description="You can use data from any source you choose. FinbloxUI components have defined and documented data props for you to bind to. "
                    icon="\f1c0"
                />
            </div>
        </section>
        <section class="tw-mt-20">
            <SectionHero
                headline1="Free"
                headline2="Trial License"
                subHeadline="Take FinbloxUI for a spin! We'll email you a free trial license key along with access to our private NPM registry."
                :headlineCss="{
                    headline2: 'tw-from-[#ffff00] tw-to-[#ffff93] tw-bg-gradient-to-b',
                }"
                align="tw-items-center"
            />
            <TrialSignup class="tw-mt-4" />
        </section>
        <section id="theming" class="tw-mt-20">
            <SectionHero
                headline1="Apply your own"
                headline2="theming"
                headline3="decisions."
                subHeadline="FinbloxUI provides headless components that allow you to fully control the CSS design."
                :headlineCss="{
                    headline2: 'tw-from-[#5EA2EF] tw-to-[#0072F5] tw-bg-gradient-to-b',
                }"

            />
            <Section2Col class="tw-mt-10">
               <template v-slot:col1>
                    <div class="tw-relative min-h-[400px]">
                        <TabButtons :buttons="['Headless', 'Styled']" @tab-button:active="(mode) => { themeingActiveMode = mode; }" />
                        <div class="themeMode" :class="{ 'showThemeMode': themeingActiveMode === 'Headless'}">
                            <h2 class="tw-text-2xl tw-text-green-500 tw-mt-4 tw-mb-2">Headless</h2>
                            <HeadlessDataPoint :dataPoint="ytdAum" class="tw-bg-gray-950" />
                            <p class="tw-mt-4">
                                FinbloxUI provides completely unstyled, fully accessible UI components, designed to integrate beautifully.
                                Components have structural markup, functionality and interaction events. Totally customize them with your own
                                CSS design.
                            </p>
                        </div>
                        <div class="themeMode" :class="{ 'showThemeMode': themeingActiveMode === 'Styled'}">
                            <h2 class="tw-text-2xl tw-text-green-500 tw-mt-4 tw-mb-2">Styled</h2>
                            <DataPoint />
                            <p class="tw-mt-4">
                                Use your favorite CSS framework or plain vanilla CSS to roll your own design.
                                FinbloxUI components also come with name-spaced CSS classes allowing you to easily target DOM elements.
                            </p>
                        </div>
                    </div>
               </template>
               <template v-slot:col2>
                    <Console language="css" filename="your.theme.css">{{ css }}</Console>
               </template>
            </Section2Col>
        </section>
        <section id="data" class="tw-mt-20">
            <SectionHero
                headline1="Bring"
                headline2="your own"
                headline3="data."
                subHeadline="FinbloxUI components are flexible allowing you to pass data, regardless of the data source, via props."
                :headlineCss="{
                    headline2: 'tw-from-[#6FEE8D] tw-to-[#17c964] tw-bg-gradient-to-b',
                }"
            />
            <Section2Col class="tw-mt-10">
               <template v-slot:col1>
                    <div class="tw-flex tw-justify-center tw-rounded-lg tw-p-8 tw-bg-gradient-to-r tw-from-[#4ADE80] tw-to-[#06B6D4]">
                        <ClientCard :client="client" />
                    </div>
               </template>
               <template v-slot:col2><Console language="javascript">{{ clientCode }}</Console></template>
            </Section2Col>
        </section>
        <section id="template" class="tw-mt-20">
            <SectionHero
                headline1="Customization made"
                headline2="easy."
                subHeadline="Need more control of the underlying HTML and DOM? No problem! FinbloxUI allows you to override default HTML markup."
                :headlineCss="{
                    headline2: 'tw-from-[#FF72E1] tw-to-[#F54C7A] tw-bg-gradient-to-b',
                }"
            />
            <Section2Col class="tw-mt-10">
                <template v-slot:col1>
                        <TabButtons class="tw-mb-4" :buttons="['Default', 'Custom']" @tab-button:active="(mode) => { templateActiveMode = mode; }" />
                        <div class="tw-relative tw-min-h-[450px] tw-flex tw-justify-center tw-rounded-lg tw-p-8 tw-bg-gradient-to-r tw-from-[#FF72E1] tw-to-[#F54C7A]">
                            <div class="themeMode tw-flex-col tw-w-1/2" :class="{ 'showThemeMode': templateActiveMode === 'Default'}">
                                <h2 class="tw-text-2xl tw-text-white tw-mt-0 tw-mb-2">Default Template</h2>
                                <QuoteDetail
                                    symbol="AAPL"
                                    security_description="Apple, Inc."
                                    current_price="192.75"
                                    price_change_amt="-0.81"
                                    price_change_pct="0.42"
                                    previous_close_price="191.94"
                                    day_low_price="192.25"
                                    day_high_price="194.91"
                                    exchange="NASDAQ"
                                    volume="5.38M"
                                    bid="192.75"
                                    ask="191.75"
                                    pe_ratio="32.75"
                                    dividend_yield="0.50"
                                    :showDetails="true"
                               />
                            </div>
                            <div class="themeMode" :class="{ 'showThemeMode': templateActiveMode === 'Custom'}">
                                <h2 class="tw-text-2xl tw-text-white tw-mt-0 tw-mb-2">Custom Template</h2>
                                <CustomQuoteDetail />
                            </div>
                        </div>
               </template>
               <template v-slot:col2><Console language="markup">{{ code }}</Console></template>
            </Section2Col>
            <p class="tw-mt-4 tw-text-white">
                You can customize the default HTML using standard VUE template slots.<br>
                This code example demonstrates how you might adjust the layout of the quote heading and price section.
            </p>
        </section>
        <section class="tw-mt-20">
            <SectionHero
                headline1="Last but"
                headline2="not least."
                subHeadline="A fully-featured financial brokerage UI library."
                :headlineCss="{
                    headline2: 'tw-from-[#FF705B] tw-to-[#FFB457] tw-bg-gradient-to-b',
                }"
                align="tw-items-center"
            />
            <div class="tw-mt-10 tw-grid md:tw-grid-cols-4 md:tw-gap-4">
                <FeatureCard
                    title="100+ Components"
                    description="With over 100 beautifully crafted components you can build everything 
                    from portfolio dashboards to client account views and everything in between."
                    icon="\f0e7"
                />
                <FeatureCard
                    title="Responsive Components"
                    description="FinbloxUI components are built to be responsive taking a mobile-first approach."
                    icon="\f3fa"
                />
               <FeatureCard
                    title="A11Y Support"
                    description="FinbloxUI provides accessibility (A11Y) support through content stucture and aria attributes"
                    icon="\f29a"
                />
                <FeatureCard
                    title="Core UI Components"
                    description="In addition to Financial UI components, FinbloxUI includes a core set of UI 
                    components such as accordions, badges, buttons, cards, etc."
                    icon="\f1b3"
                />
                <FeatureCard
                    title="Charts &amp; Graphs"
                    description="FinbloxUI uses the chartjs charting library under the hood. You can completely control the chart using the standard chart options."
                    icon="\f200"
                />
                <FeatureCard
                    title="CSS Themes"
                    description="FinbloxUI also comes with some ready to use themse to get you up and running. Feel free to use them as starting point for your own theme."
                    icon="\f38b"
                    font="brands"
                />
                <FeatureCard
                    title="Animations"
                    description="We include an optional UI animation layer you can apply to micro-interactions to components."
                    icon="\f0e7"
                />
                <FeatureCard
                    title="Works with React"
                    description="FinbloxUI components can be embedded in a React application."
                    icon="\f41b"
                    font="brands"
                />
            </div>
        </section>
         <section class="tw-mt-20">
            <SectionHero
                headline1="Free"
                headline2="Trial License"
                subHeadline="Take FinbloxUI for a spin! We'll email you a free trial license key along with access to our private NPM registry."
                :headlineCss="{
                    headline2: 'tw-from-[#ffff00] tw-to-[#ffff93] tw-bg-gradient-to-b',
                }"
                align="tw-items-center"
            />
            <TrialSignup class="tw-mt-4" />
        </section>

    </main>
    <footer class="tw-h-[200px] tw-bg-gray-950">

    </footer>
    
</template>
<script setup>
import { ref } from "vue";
import Navbar from "@/www-components/Navbar";
import TrialSignup from "@/www-components/TrialSignup";
import ComponentCloud from "@/www-components/ComponentCloud";
import SectionHero from "@/www-components/SectionHero";
import Section2Col from "@/www-components/Section2Col";
import FeatureCard from "@/www-components/FeatureCard";
import TabButtons from "@/www-components/TabButtons";
import Console from "@/www-components/Console";
import HeadlessDataPoint from "@/components/Core/DataPoint";
import DataPoint from "@/www-components/DataPoint";
import ClientCard from "@/www-components/ClientCard";
import CustomQuoteDetail from "@/www-components/CustomQuoteDetail";
import QuoteDetail from "@/components/Core/QuoteDetail/QuoteDetail";

const themeingActiveMode = ref("Headless");
const templateActiveMode = ref("Default");

const ytdAum = {
  "label": "YTD AUM",
  "value": "12345678.90",
  "format": "currency",
  "trend": {
    "format": "currency",
    "value": 14526.34,
    "direction": "up"
  }
}

const client = {
    "id": null,
    "name": {
        "first_name": "Marcos",
        "last_name": "Hirthe",
        "household": "Marcos Hirthe Household"
    },
    "stats": [
        {
            "label": "Total AUM",
            "value": "37,698,840.62",
            "order": 1,
            "format": "currency"
        },
        {
            "label": "YTD Fees",
            "value": "7,553.37",
            "order": 2,
            "format": "currency"
        },
        {
            "label": "YTD Fees %",
            "value": "2.26",
            "order": 3,
            "format": "percent"
        },
        {
            "label": "YTD Performance",
            "value": "2.00",
            "order": 4,
            "format": "percent"
        },
        {
            "label": "Number of Account",
            "value": "4",
            "order": 5,
            "format": null
        },
    ],
    "contact_info": {
        "email": {
            "label": "E-Mail",
            "value": "Marcos47@gmail.com"
        },
        "phone": [
            {
                "label": "mobile",
                "value": "893-478-7656"
            },
            {
                "label": "home",
                "value": "528-755-4849"
            }
        ],
        "address": {
            "street_1": "Baron Cove",
            "street_2": "Suite 994",
            "city": "Kelsieview",
            "state": "Kentucky",
            "postal_code": "35339"
        }
    }
}

const css = `
/* use your favorite CSS framework */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* set CSS for FinbloxUI DataPoint Component */
.fb-quote-detail {
    @apply bg-blue-500 rounded text-white drop-shadow-lg w-[350px] z-20;
    h4 {
        @apply text-3xl;
    }
    .fb-data-point-body {
        @apply p-3;
    }
    .fb-data-point-trend {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .fb-data-point-trend[data-trend-direction='up']::before {
        content: "+";
    }
    .fb-data-point-trend[data-trend-direction='down']::before {
        content: "-";
    }
    .fb-data-point-footer {
        @apply pl-3 py-2 bg-blue-400/40;
    }
    &::before {
        display: inline-block;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
    }

    .fb-data-point-body {
        margin-left: 55px;
    }

    &::before {
        position: absolute;
        top: 20px;
        left: 10px;
        font-size: 20px !important;
        font: var(--fa-font-solid);
        padding: .75rem 1rem;
        @apply rounded-full bg-white text-blue-500;
    }
    &::before {
        content: "\\24";
    }
}
`;

const code = `
<QuoteDetail
    :symbol="symbol"
    :security_description="security_description"
    :current_price="current_price"
    :price_change_amt="price_change_amt"
    :previous_close_price="previous_close_price"
    :day_low_price="day_low_price"
    :day_high_price="day_high_price"
    :exchange="exchange"
    :volume="volume"
    :bid="bid"
    :ask="ask"
    :pe_ratio="pe_ratio"
    :dividend_yield="dividend_yield"
    :showDetails="showDetails"
>
    <!-- You can override the HTML in the quote heading section -->
    <template #heading="slotProps">
        <div v-bind="slotProps.attrs">
            <h3>{{ slotProps.security_description }}</h3>
            <h4><span>{{ slotProps.props.exchange }}:</span>{{ slotProps.symbol }}</h4>
        </div>
    </template>
    <!-- You can override the HTML in the quote price section -->
    <template #price="slotProps">
        <div v-bind="slotProps.attrs">
            <h4>{{ slotProps.current_price }}</h4>
            <div>
                <span
                    :class="slotProps.price_change_pct_css"
                >
                    {{ slotProps.price_change_pct }}
                </span>
                <span
                    :class="slotProps.price_change_amt_css"
                >
                    {{ slotProps.price_change_amt }}
                </span>
            </div>
        </div>
    </template>
</QuoteDetail>
`;
const clientCode = `
/**
 * Get your data from an async HTTP call or 
 * data store like Pinia or Vuex
 */ 
const client = {
    name: {...},
    stats: {...},
    contact_info: {...}
}
/**
 * Pass your data into FinbloxUI component
 */
<ClientCard :client="client" />
`;
</script>
<style lang="scss" scoped>
#data:deep(.section-2-col > div) {
    @apply lg:tw-mt-0;
}
#data:deep(.section-2-col .console),
#template:deep(.section-2-col .console) {
    @apply tw-min-h-full;
}

.button {
    @apply tw-px-4 tw-py-2 tw-rounded-full tw-bg-blue-600 hover:tw-bg-blue-500 tw-w-full md:tw-w-fit tw-text-center;
}

.card {
    @apply tw-mb-10 md:tw-m-0 tw-p-4 tw-rounded-lg tw-bg-[#18181b];
    h2 {
        @apply tw-text-green-500 tw-text-lg tw-pb-3 tw-font-semibold;
    }
    h2::before {
        font: var(--fa-font-solid);
        @apply tw-mr-2 tw-p-2 tw-rounded-full tw-items-center tw-bg-zinc-700 tw-text-green-500;
    }
    &.headless h2::before {
        content: "\f0e7";
    }
    p {
        @apply tw-text-gray-200;
    }
}

.themeMode {
    opacity: 0;
    transition: opacity 0.6s linear;
    @apply tw-absolute;
}
.showThemeMode {
    opacity: 1;
}




</style>