import { Link, LinkProps, useLocation } from "react-router-dom";

interface NavLinkProps extends LinkProps {
}

export default function NavLink(props: NavLinkProps){

    const location = useLocation();

    const sub = "/" + location.pathname.split("/")[1];

    const {children, ...rest} = props;

    return (
        <Link {...rest} data-active={sub === props.to}>
            <span>
                {props.children}
            </span>
        </Link>
    )
}