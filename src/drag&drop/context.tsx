import React, { Component } from 'react';
const AppContext = React.createContext()
class AppContextProvider extends Component {
  state = {
    cards: []
  }

  changeCardStatus = async (uid: number, status: any) => {
    const newCards = this.state.cards.map(card => {
      if (card.uid === uid) {
        return {
          ...card,
          status: status
        }
      } else {
        return card
      }
    })
    await this.setState({
      cards: newCards
    })
  }
  changeCartStatus = async (status: any) => {
    const newCards = this.state.cards.map(card => {
        return {
          ...card,
          status: status
        }

    })
    await this.setState({
      cards: newCards
    })
  }

  setCards = (cards: any) => {
    this.setState({
      cards: cards
    })
  }


  render() {
    return (
      <AppContext.Provider
        value={{
          cards: this.state.cards,
          changeCardStatus: this.changeCardStatus,
          changeCartStatus: this.changeCartStatus,
          setCards: this.setCards
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export { AppContextProvider, AppContext }
