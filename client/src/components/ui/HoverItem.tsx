import { useMemo, useState } from 'react';

type StyleClass = string | string[];

type HoverItemProps = {
  children: React.ReactNode;
  preStyleClass: StyleClass;
  whileTap: () => StyleClass;
};

const getHtmlClassNameForm = (className: StyleClass) =>
  ['']
    .concat(className)
    .join(' ')
    .replace(/\s{2,}/, ' ')
    .trim();

const HoverItem = ({ whileTap, children, preStyleClass }: HoverItemProps) => {
  const joinedClassName = useMemo(
    () => getHtmlClassNameForm(preStyleClass),
    []
  );
  const [styleClass, setStyleClass] = useState(joinedClassName);
  return (
    <div
      onMouseDown={() =>
        setStyleClass(`${joinedClassName} ${getHtmlClassNameForm(whileTap())}`)
      }
      onMouseUp={() => setStyleClass(joinedClassName)}
      className={styleClass}
    >
      {children}
    </div>
  );
};

export { HoverItem };
