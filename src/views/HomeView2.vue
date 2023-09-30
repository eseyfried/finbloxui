<!-- eslint-disable vue/valid-template-root -->
<template>
    <Navbar />
    <main class="mt-28 px-8 md:px-24">
        <section id="hero" class="text-white flex h-screen relative overflow-hidden lg:overflow-visible w-full">
            <div class="flex relative z-20 flex-col gap-6 w-full lg:w-1/2 xl:mt-10">
                <div class="text-center leading-8 md:leading-10 md:text-left">
                    <div class="inline-block">
                        <h1 class="tracking-tight inline font-semibold text-[2.5rem] lg:text-5xl">Build&nbsp;</h1>
                        <h1 class="tracking-tight inline font-semibold from-[#FF1CF7] to-[#b249f8] text-[2.5rem] lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b">kicka#%&nbsp;</h1>
                    </div>
                    <h1 class="tracking-tight inline font-semibold text-[2.5rem] lg:text-5xl">financial user interfaces regardless of your design experience.</h1>
                </div>
                <h2 class="w-full md:w-1/2 my-2 text-lg lg:text-xl font-normal text-default-500 block max-w-full text-center md:text-left">Modern headless Vue UI library for building Self-Directed or Advisor frontends.</h2>
                <div class="flex flex-col md:flex-row items-center gap-4">
                    <a class="button" href="/docs" role="button">Learn More</a>
                </div>
            </div>
            <div class="hidden md:flex flex-col">
                <ComponentCloud />
            </div>
        </section>
        <section class="">
            <div class="grid md:grid-cols-3 md:gap-4">
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
        <section class="mt-20">
            <SectionHero
                headline1="Free"
                headline2="Trial License"
                subHeadline="Take FinbloxUI for a spin! We'll email you a free trial license key along with access to our private NPM registry."
                :headlineCss="{
                    headline2: 'from-[#ffff00] to-[#ffff93] bg-gradient-to-b',
                }"
                align="items-center"
            />
            <TrialSignup class="mt-4" />
        </section>
        <section id="theming" class="mt-20">
            <SectionHero
                headline1="Apply your own"
                headline2="theming"
                headline3="decisions."
                subHeadline="FinbloxUI provides headless components that allow you to fully control the CSS design."
                :headlineCss="{
                    headline2: 'from-[#5EA2EF] to-[#0072F5] bg-gradient-to-b',
                }"

            />
            <Section2Col class="mt-10">
               <template v-slot:col1>
                    <div class="relative min-h-[400px]">
                        <TabButtons :buttons="['Headless', 'Styled']" @tab-button:active="(mode) => { themeingActiveMode = mode; }" />
                        <div class="themeMode" :class="{ 'showThemeMode': themeingActiveMode === 'Headless'}">
                            <h2 class="text-2xl text-green-500 mt-4 mb-2">Headless</h2>
                            <HeadlessDataPoint :dataPoint="ytdAum" class="bg-gray-950" />
                            <p class="mt-4">
                                FinbloxUI provides completely unstyled, fully accessible UI components, designed to integrate beautifully.
                                Components have structural markup, functionality and interaction events. Totally customize them with your own
                                CSS design.
                            </p>
                        </div>
                        <div class="themeMode" :class="{ 'showThemeMode': themeingActiveMode === 'Styled'}">
                            <h2 class="text-2xl text-green-500 mt-4 mb-2">Styled</h2>
                            <DataPoint />
                            <p class="mt-4">
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
        <section id="data" class="mt-20">
            <SectionHero
                headline1="Bring"
                headline2="your own"
                headline3="data."
                subHeadline="FinbloxUI components are flexible allowing you to pass data, regardless of the data source, via props."
                :headlineCss="{
                    headline2: 'from-[#6FEE8D] to-[#17c964] bg-gradient-to-b',
                }"
            />
            <Section2Col class="mt-10">
               <template v-slot:col1>
                    <div class="flex justify-center rounded-lg p-8 bg-gradient-to-r from-[#4ADE80] to-[#06B6D4]">
                        <ClientCard :client="client" />
                    </div>
               </template>
               <template v-slot:col2><Console language="javascript">{{ clientCode }}</Console></template>
            </Section2Col>
        </section>
        <section id="template" class="mt-20">
            <SectionHero
                headline1="Customization made"
                headline2="easy."
                subHeadline="Need more control of the underlying HTML and DOM? No problem! FinbloxUI allows you to override default HTML markup."
                :headlineCss="{
                    headline2: 'from-[#FF72E1] to-[#F54C7A] bg-gradient-to-b',
                }"
            />
            <Section2Col class="mt-10">
                <template v-slot:col1>
                        <TabButtons class="mb-4" :buttons="['Default', 'Custom']" @tab-button:active="(mode) => { templateActiveMode = mode; }" />
                        <div class="relative min-h-[450px] flex justify-center rounded-lg p-8 bg-gradient-to-r from-[#FF72E1] to-[#F54C7A]">
                            <div class="themeMode flex-col w-1/2" :class="{ 'showThemeMode': templateActiveMode === 'Default'}">
                                <h2 class="text-2xl text-white mt-0 mb-2">Default Template</h2>
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
                                <h2 class="text-2xl text-white mt-0 mb-2">Custom Template</h2>
                                <CustomQuoteDetail />
                            </div>
                        </div>
               </template>
               <template v-slot:col2><Console language="markup">{{ code }}</Console></template>
            </Section2Col>
            <p class="mt-4 text-white">
                You can customize the default HTML using standard VUE template slots.<br>
                This code example demonstrates how you might adjust the layout of the quote heading and price section.
            </p>
        </section>
        <section class="mt-20">
            <SectionHero
                headline1="Last but"
                headline2="not least."
                subHeadline="A fully-featured financial brokerage UI library."
                :headlineCss="{
                    headline2: 'from-[#FF705B] to-[#FFB457] bg-gradient-to-b',
                }"
                align="items-center"
            />
            <div class="mt-10 grid md:grid-cols-4 md:gap-4">
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
         <section class="mt-20">
            <SectionHero
                headline1="Free"
                headline2="Trial License"
                subHeadline="Take FinbloxUI for a spin! We'll email you a free trial license key along with access to our private NPM registry."
                :headlineCss="{
                    headline2: 'from-[#ffff00] to-[#ffff93] bg-gradient-to-b',
                }"
                align="items-center"
            />
            <TrialSignup class="mt-4" />
        </section>

    </main>
    <footer class="h-[200px] bg-gray-950">

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
    @apply lg:mt-0;
}
#data:deep(.section-2-col .console),
#template:deep(.section-2-col .console) {
    @apply min-h-full;
}

.button {
    @apply px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 w-full md:w-fit text-center;
}

.card {
    @apply mb-10 md:m-0 p-4 rounded-lg bg-[#18181b];
    h2 {
        @apply text-green-500 text-lg pb-3 font-semibold;
    }
    h2::before {
        font: var(--fa-font-solid);
        @apply mr-2 p-2 rounded-full items-center bg-zinc-700 text-green-500;
    }
    &.headless h2::before {
        content: "\f0e7";
    }
    p {
        @apply text-gray-200;
    }
}

.themeMode {
    opacity: 0;
    transition: opacity 0.6s linear;
    @apply absolute;
}
.showThemeMode {
    opacity: 1;
}




</style>