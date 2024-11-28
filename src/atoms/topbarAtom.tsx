import { atom } from "jotai";

type TopbarAtom = {
  userMenuAnchor: null | HTMLElement;
  navigationMenuAnchor: null | HTMLElement;
};
const topbarAtom = atom<TopbarAtom>({
  navigationMenuAnchor: null,
  userMenuAnchor: null,
});

export default topbarAtom;
