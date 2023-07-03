import { useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints({
    xs: 0, // <576px
    sm: 577, // ≥576px
    md: 769, // ≥768px
    lg: 993, // ≥992px
    xl: 1201, // ≥1200px
    xxl: 1401, // ≥1400px
  });

  const isMobile = breakpoints.between("xs", "sm");

  export {
    isMobile as isMobile
  }