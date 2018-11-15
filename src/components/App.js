import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";

class App extends React.Component {
  state = {
    fishes: {}
  };

  addFish = newFish => {
    // 1. Hacer una copia del estado existente
    const newFishes = { ...this.state.fishes };

    // 2.Añadir newFish a newFishes
    newFishes[`fish${Date.now()}`] = newFish;

    // 3.Set newFishes as the new state
    this.setState({ fishes: newFishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
