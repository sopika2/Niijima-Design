interface Props {
    code?: string;
    title?: string;
    target?: string;
    text?: string;
    back?: {
        label: string;
        href: string;
    };
}
declare const Palace: import("svelte").Component<Props, {}, "">;
type Palace = ReturnType<typeof Palace>;
export default Palace;
