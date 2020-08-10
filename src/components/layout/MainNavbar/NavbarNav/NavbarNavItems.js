import React from "react";

import { Nav, NavItem, NavLink } from "shards-react";
import { NavLink as RouteNavLink } from "react-router-dom";
import { Store } from "../../../../flux";

class NabarNavItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navItems: Store.getNavbarItems()
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getNavbarItems()
    });
  }

  render() {
    const { navItems: items } = this.state;
    return (
      <Nav fill navbar className="border-left flex-row" >
        {items.map((item, idx) => (
          <NavItem className="border-right px-3" key={idx} item={item}>
            <NavLink tag={RouteNavLink} to={item.to}>
              {item.title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    )
  }
}

export default NabarNavItems;
