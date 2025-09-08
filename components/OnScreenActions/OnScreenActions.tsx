import type { onScreenActionsType } from "./type";
const OnScreenActions = (props: onScreenActionsType) => {
  const { dom, callback } = props;
  if (dom == null) return null;
  return <div onClick={callback}>{dom}</div>;
};
export default OnScreenActions;
