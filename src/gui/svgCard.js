import React from "react";

const valsObj = {
  Three: "3",
  Four: "4",
  Five: "5",
  Six: "6",
  Seven: "7",
  Eight: "8",
  Nine: "9",
  Ten: "10",
  Jack: "J",
  Queen: "Q",
  King: "K",
  Ace: "A",
  Two: "2"
};

class DynamicImport extends React.Component {
  state = {
    component: null
  };
  componentWillMount() {
    this.props.load().then(component => {
      if (component) {
        this.setState(() => ({
          component: component.default ? component.default : component
        }));
      }
    });
  }
  render() {
    return this.props.children(this.state.component);
  }
}

const Card = props => {
  const styles = {
    marginTop: props.selected ? "0rem" : "1rem",
    marginLeft: "-2rem",
    width: "4rem",
    boxShadow: "-0.1rem 0.2rem 1rem gray",
    cursor: "pointer"
  };

  return (
    <div style={styles}>
      <DynamicImport
        load={() =>
          import(`react-svg-loader!../../refs/pcards/${valsObj[props.value]}${
            props.suit[0]
          }.svg`)
        }
      >
        {Component =>
          Component === null ? <p>Loading</p> : <Component {...props} />
        }
      </DynamicImport>
    </div>
  );
};

export default Card;
