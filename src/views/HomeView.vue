<template>
    <section class="hero">
        <img src="../assets/logo-400.png" class="mx-auto d-block">
        <h1 class="fs-1 mt-4">A Financial UI Component Framework</h1>
        <h2>FinBlox-UI is a Vue UI Library packed with handcrafted ui components.</h2>
        <h2>Everything you need to build amazing investment/brokerage applications for advisors and their customers.</h2>
    </section>
    <section class="build-faster">
        <div class="animate__animated" data-animate="animate__fadeInLeft">
            <h3 class="text-4xl">
                Build Applications Faster
            </h3>
            <p class="leading-7">
                Whether you're building an application for registered investment advisors (RIA) or their clients, 
                FinBlox-UI can dramatically accelerate your time to market. Our team has carefully designed each component 
                to meet the most common use cases. With over 100+ components in our library, you can compose highly functional and amazing applications.
            </p>
        </div>
        <div class="animate__animated" data-animate="animate__fadeInRight">
            <img src="https://via.placeholder.com/350" class="mx-auto d-block">
        </div>
    </section>
    <section class="brand h-full">
        <h3 class="text-4xl mb-4">Compose. Configure. Style. Ship!</h3>
        <div class="row">
            <div class="animate__animated" data-animate="animate__fadeInUp">
                <h4 class="text-2xl">
                    <i class="bi bi-grid-1x2-fill d-block"></i>
                    Compose
                </h4>
                <p class="leading-7">
                    Compose your webpages or views with FinBlox-UI components. Get started quickly with our pre-built page layouts.
                </p>
            </div>
            <div class="animate__animated" data-animate="animate__fadeInUp">
                <h4 class="text-2xl">
                    <i class="bi bi-gear-fill d-block"></i>
                    Configure
                </h4>
                <p class="leading-7">
                    Components offer many configuration options as well as custom templates.
                </p>
            </div>
            <div class="animate__animated" data-animate="animate__fadeInUp">
                <h4 class="text-2xl">
                    <i class="bi bi-code-slash d-block"></i>
                    Style
                </h4>
                <p class="leading-7">
                    FinBlox-UI components are headless, meaning they are unstyled out of the box. 
                    Create your own CSS themes to match your brand and style or use some of our themes.
                </p>
            </div>
        </div>
    </section>
    <section class="data">
        <h3 class="text-4xl">
            Bring Your Own Data...We Got the UI Covered!
        </h3>
        <p class="leading-7">
            Use any data source with FinBlox-UI. Simply pass the data to the component.
        </p>
    </section>
    <section class="features">
        <div class="animate__animated md:justify-self-end" data-animate="animate__fadeInLeft">
            <img src="https://via.placeholder.com/350" >
        </div>
        <div class="animate__animated md:justify-self-start" data-animate="animate__fadeInRight">
            <h3 class="text-4xl mb-4">
                Features
            </h3>
            <ul class="list-unstyled leading-7">
                <li>Fully Documented Component Library</li>
                <li>Pre-Built Page Layouts</li>
                <li>Data Agnostic</li>
                <li>Completely Themable</li>
                <li>Configurable Components</li>
                <li>Custom Rendering Templates</li>
            </ul>
        </div>
    </section>
    <section class="cta">
        <h3 class="text-4xl me-4">Get Started With FinBlox-UI</h3>
        <a href="/docs" class="btn">Learn More</a>
    </section>
    <section class="sponsor">
        <h3 class="text-4xl">Sponsored By</h3>
        <img src="../assets/BridgeFT_Logo_black_ART-768x146.png" alt="bridgeft logo">
    </section>
</template>
<script>
import { onMounted } from 'vue';
export default {
    setup() {
        onMounted( () => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const animateClass = entry.target.attributes['data-animate'].value
                    if (entry.isIntersecting) {
                        entry.target.classList.add(animateClass);
                    }
                });
            });
            const animationEls = document.querySelectorAll('.animate__animated')
            animationEls.forEach(el => {
                observer.observe(el);
            })
            
        })
        
    }
}
</script>
<style lang="scss" >

section {
    padding: 50px 20px;
    h3 {
        margin-bottom: 1rem;
    }
    @apply grid;
}
section.hero {
    img {
        // width: 400px;
        @apply justify-self-center;
    }
    h1 {
        @apply text-2xl mb-0;
    }
    h2 {
        @apply text-lg m-0 p-0 mt-1;
    }
    @apply flex-col;
}
section.build-faster {
    // background-color: #0F6DFD;
    // color: var(--bs-white);
    img {
        // width: 300px;
    }
    @apply bg-blue-950 text-white grid grid-cols-1 md:grid-cols-2 md:gap-4 justify-items-center;
}
section.brand {
    // background-color: var(--bs-white);
    // opacity: 0.75;
    h3 {
       text-align: center;
    }
    h4 {
       text-align: left;
    //    color: #0F6DFD;
        @apply text-teal-500 my-2 md:my-1;
    }
    p {
        @apply my-0 py-0;
    }
    div.row {
        @apply grid grid-cols-1 md:grid-cols-3 md:gap-4;
    }
    @apply bg-white;
}
section.data {
    h3,p {
       text-align: center;
    }
    // background-color: var(--bs-gray-900);

    // color: var(--bs-white);
    @apply bg-gray-900 text-white;
}
section.flexible {
    
    p,h3 {
       text-align: right;
    }
}
section.features {
    background-color: var(--bs-white);
    h3 {
       text-align: left;
    }
    @apply grid grid-cols-1 md:grid-cols-2 md:gap-4 bg-white justify-items-center;
}

section.sponsor {
    // background-color: var(--bs-gray-300);
    img {
        width: 50%;
    }
    @apply bg-gray-200;
}
section.cta {
    // background-color: #279291;
    h3 {
       text-align: center;
       color: var(--bs-white);
    }
    .btn {
        width: 150px;
    }
    @apply bg-teal-500 grid justify-items-center;
}
body {
    // background: url(../assets/hero-background.webp) no-repeat center center fixed;
    // background-size: cover;
}
section.hero {
    background-color: #ffffff;
    // opacity: 0.75;
    h1 {
        text-align: center;
    }
    h2 {
        font-weight: 200;
        text-align: center;
    }
}
.btn {
    @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 no-underline text-center;
}
@media (min-width: 992px)  {
    section {
        padding: 100px;
    }
//     section.hero {
//         padding: 200px;
//     }
    
//     section.build-faster {
//         p, h3 {
//             text-align: right;
//         }
//         img {
//             width: 350px;
//         }
//     }
}
</style>