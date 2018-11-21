import React from "react";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Menu from "./Menu";

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

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <Menu pescados={this.state.fishes} />
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
