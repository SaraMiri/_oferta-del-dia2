import React from "react";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Menu from "./Menu";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
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

  addToOrder = key => {
    // 1. Hacer una copia del estado existente
    const newOrder = { ...this.state.order };
    // 2.Añadir order a newOrder o actualizar la cantidad (condición)
    if (newOrder[key]) {
      newOrder[key] = newOrder[key] + 1;
    } else newOrder[key] = 1;
    // 3.Set newOrder as the new state
    this.setState({ order: newOrder });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <Menu pescados={this.state.fishes} addToOrder={this.addToOrder} />
        <Order pescados={this.state.fishes} pedido={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
