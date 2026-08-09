import gsap from "gsap";

export const pageEnter = (node) => {
  return gsap.from(node, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out"
  });
};

export const pageExit = (node) => {
  return gsap.to(node, {
    opacity: 0,
    y: -40,
    duration: 0.5,
    ease: "power3.in"
  });
};
