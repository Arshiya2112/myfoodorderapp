/*Defines a reusable Button component*/

export default function Button({ children, textOnly, className, ...props }) { //children - content inside the button, textOnly - boolean that when true, styles the button as a text-only button, className - additional CSS classes passed from parent for custom styling, ...props - rest parameter that captures any additional props
    let cssClasses = textOnly ? 'text-button' : 'button';
    cssClasses += ' ' + className;

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
}