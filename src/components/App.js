import React from "react";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Menu from "./Menu";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    // Read from localStorage
    const localStorageRef = localStorage.getItem(this.props.storeId);
    if (localStorageRef) {
      console.log("Restoring it!");
      console.log(JSON.parse(localStorageRef));

      this.setState({ order: JSON.parse(localStorageRef) });
    }

    // Sync data from Firebase
    const config = {
      context: this,
      state: "fishes"
    };
    this.ref = base.syncState(`${this.props.storeId}/fishes`, config);
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    // Save to localStorage
    console.warn(this.state.order);
    localStorage.setItem(this.props.storeId, JSON.stringify(this.state.order));
  }

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

  addToOrder = orderKey => {
    // 1. Hacer una copia del estado existente
    const newOrder = { ...this.state.order };
    // 2.Añadir order a newOrder o actualizar la cantidad (condición)
    newOrder[orderKey] = newOrder[orderKey] ? newOrder[orderKey] + 1 : 1;
    // 3.Set newOrder as the new state
    this.setState({ order: newOrder });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <Menu fishes={this.state.fishes} addToOrder={this.addToOrder} />
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
