import React, { Component } from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

import './Product.css';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlighted: false
    };

    this.deleteMe = this.deleteMe.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.unHighlight = this.unHighlight.bind(this);
    this.highlight = this.highlight.bind(this);
  }

  highlight() {
    this.setState({ highlighted: false });
  }

  unHighlight() {
    this.setState({ highlighted: true });
  }

  handleDrop(e) {
    e.stopPropagation();
    this.unHighlight();
    this.props.changeTruck(e.dragData.index, this.props.index, e.dragData);
    e.sourceElem.style.visibility = 'hidden';
  }

  deleteMe() {
    this.props.kill(this.props.id);
  }

  render() {
    let items = {
      label: this.props.children.label,
      nome: this.props.children.nome,
      idTruck: this.props.children.idTruck,
      index: this.props.children.index
    };

    return (
      <DragDropContainer
        targetKey={this.props.targetKey}
        returnToBase
        dragData={items}
        onDrop={this.deleteMe}
        customDragElement={this.props.customDragElement}
      >
        <DropTarget
          onHit={this.handleDrop}
          onDragEnter={this.highlight}
          onDragLeave={this.unHighlight}
          targetKey={items.index}
        >
          <div className={items.nome}>{items.label}</div>
        </DropTarget>
      </DragDropContainer>
    );
  }
}

export default Product;
