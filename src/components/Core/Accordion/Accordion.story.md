## Overview
 The `AccordionRoot` is a core Finblox-UI component used to construct a classic accordion style ui which is
 a vertically stacked set of interactive headings that each reveal an associated section of content.
 Cosntructing an accordion requires the use of several related sub-components listed below.
 
 ### Accordion Items
 
 A typical implementation would use an array of accordion item objects with the following fields:
 
 - **value**: the value field is the only required field. It is used with `<AccordionItem />`

 - **title**: this field is intended to be passed to the `<AccordionHeader />` or `<AccordionTrigger />` as slotted content

 - **content**: this field is intended to be passed to the `<AccordionContent />` as slotted content
 
 For example:
 
 ```javascript
 const accordionItems = [
  {
      value: 'item-1',
      title: 'Is it accessible?',
      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
  },
  {
      value: 'item-2',
      title: 'Is it unstyled?',
      content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.',
   },
   {
      value: 'item-3',
      title: 'Can it be animated?',
      content: 'Yes! You can use the transition prop to configure the animation.',
   },
 ]
 ```

 ### Available CSS Classes

| Class Name | Description |
| ---------- | ----------- |
| .fb-accordion | The class applied to the component root element. |
| .fb-accordion-item | The class applied to the component item element. |
| .fb-accordion-header | The class applied to the component item header element. |
| .fb-accordion-trigger | The class applied to the item trigger element. |
| .fb-accordion-content | The class applied to the component item content element. |

 ### Related Components
  - AccordionItem
  - AccordionHeader
  - Accordion Trigger
  - Accordion Content