<template>
    <Story
        title="Core/Popover"
        auto-props-disabled
    >
        <template #controls="{state}">
            <HstText v-model="state.selector" title="selector" />
            <PropDesc :component="Popover" prop="selector" />
            <HstSelect v-model="state.trigger" title="trigger" :options="['click','hover']"/>
            <PropDesc :component="Popover" prop="trigger" />
            <HstJson v-model="state.options" title="options" />
            <PropDesc :component="Popover" prop="options" />
        </template>

        <Variant title="Default Click" :init-state="initState">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <button id="show">Click Me</button>
                    <Popover
                        :selector="state.selector"
                        :trigger="state.trigger"
                        :options="state.options"
                    >
                        <div class="popover-content">Popover Content</div>
                    </Popover>

                </div>
            </template>
        </Variant>

        <Variant title="Hover" :init-state="() => initState({'trigger': 'hover'})">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <a href="#" id="show">Hover Over Me</a>
                    <Popover
                        :selector="state.selector"
                        :trigger="state.trigger"
                        :options="state.options"
                    >
                        <div class="popover-content">Popover Content</div>
                    </Popover>

                </div>
            </template>
        </Variant>

        <Variant title="Custom Placement" :init-state="() => initState({'options': {'placement': 'bottom'}})">
            <template #default="{state}">
                <div class="md:tw-w-1/2">
                    <button id="show">Click Me</button>
                    <Popover
                        :selector="state.selector"
                        :trigger="state.trigger"
                        :options="state.options"
                    >
                        <div class="popover-content">Popover Content</div>
                    </Popover>

                </div>
            </template>
        </Variant>
        
    </Story>
</template>
<script setup>
import { reactive } from 'vue'
import { defaultValue } from "@/../.histoire/modules/useStoryHelper";
import PropDesc from '@/../.histoire/components/PropDesc';
import { logEvent } from 'histoire/client'

import Popover from '@/components/Core/Popover/Popover';


const state = reactive({
    selector: defaultValue(Popover, 'selector',"#show"),
    trigger: defaultValue(Popover, 'trigger'),
    options: defaultValue(Popover, 'options'),
})

const initState = (props) => {
    return {
        ...state,
        ...props
    }
}


</script>