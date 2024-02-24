export const delayed_pagination_animation = (i: number) => ({
  initial: {
    opacity: 0.3,
    scale: 0.95,
    rotateX: -30,
    filter: "blur(7px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0, 0.93, 0.42, 0.87], delay: i * 0.05 },
  },
  exit: {
    opacity: 0.3,
    scale: 0.95,
    rotateX: -30,
    filter: "blur(7px)",
    transition: { duration: 0.2, ease: [0, 0.93, 0.42, 0.87], delay: i * 0.05 },
  },
});

export const standard_pagination_animation = {
  initial: {
    opacity: 0.3,
    scale: 0.95,
    rotateX: -30,
    filter: "blur(7px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0, 0.93, 0.42, 0.87] },
  },
  exit: {
    opacity: 0.3,
    scale: 0.95,
    rotateX: -30,
    filter: "blur(7px)",
    transition: { duration: 0.2, ease: [0, 0.93, 0.42, 0.87] },
  },
};
