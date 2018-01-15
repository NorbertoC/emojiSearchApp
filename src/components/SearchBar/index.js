import React, { Component } from 'react';
import _ from 'lodash';
import { Emoji, emojiIndex } from 'emoji-mart';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bestOption: null,
      randomOption: null,
      clicked: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onClick = this.onClick.bind(this);

  }

  onInputChange(event) {
    let eventValue = event.target.value;
    let emojiObj = '';

    if (eventValue) {
      emojiObj = emojiIndex.search(eventValue).map((smileObj) => smileObj)
    } else {
      emojiObj = '';
    }

    const firstEmoji = _.get(emojiObj, ['0'], '');

    this.setState({ bestOption: firstEmoji })
  }

  onClick() {
    const randomNumber = `${Math.floor(Math.random() * (1563 - 1) + 1)}`;
    const emojiObj = _.map(emojiIndex.emojis, ((smileObj) => smileObj))
    const secondEmoji = _.get(emojiObj, [randomNumber], '');

    this.setState({ clicked: !this.state.clicked, randomOption: secondEmoji, bestOption: null });
  }

  renderEmoji() {
    const { bestOption, randomOption } = this.state;
    if (randomOption && !bestOption) {
      return (
        <div>
          <span>Random emoji for you: </span>
          <Emoji emoji={{ id: randomOption.id }} size={32} />
          <span> + {randomOption.name}</span>
        </div>
      )
    } else if (bestOption) {
      return (
        <div>
          <span>Our best choice for you is: </span>
          <Emoji emoji={{ id: bestOption.id }} size={32} />
          <span> + {bestOption.name}</span>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <h3><span>Type the Emoji that you are looking for: </span>
          <input onChange={this.onInputChange} />
        </h3>

        <h2>
          {this.renderEmoji()}
        </h2>

        <div>
          <span>Undecided ? Generate some random Emojis: </span>
          <button onClick={this.onClick}>Click</button>
        </div>

      </div>
    )
  }
}

export default SearchBar;