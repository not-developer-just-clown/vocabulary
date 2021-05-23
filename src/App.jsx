import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordInputValue: '',
      transleteInputValue: '',
      data: props.data,
      selectedRows: {},
      isEditNow: null
    };
    this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
  }

  handleChangeInputValue({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleOnChangeUnused = () => { }
  handleOnSelectRow(id, i) {
    const selectedRows = { ...this.state.selectedRows };
    selectedRows[id] != undefined
      ? delete selectedRows[id]
      : selectedRows[id] = i
    this.setState({ selectedRows });
  }

  handleOnCreateRow = () => {
    const state = { ...this.state };
    const row = {
      word: this.state.wordInputValue,
      translate: this.state.transleteInputValue
    };
    state.isEditNow != null
      ? state.data[state.isEditNow] = row
      : state.data.push(row)
    state.isEditNow = null;
    state.selectedRows = {};
    state.wordInputValue = '';
    state.transleteInputValue = '';
    localStorage.setItem('l23h4o2upqsaf', JSON.stringify(state.data));
    this.setState(state);
  }
  handleOnEditRow = () => {
    const state = { ...this.state };
    const dataId = state.selectedRows[Object.keys(state.selectedRows)[0]];
    state.isEditNow = dataId;
    const { word, translate } = state.data[dataId];
    state.wordInputValue = word;
    state.transleteInputValue = translate;
    localStorage.setItem('l23h4o2upqsaf', JSON.stringify(state.data));
    this.setState(state);
  }
  handleOnDeleteRow = () => {
    const state = { ...this.state };
    Object.keys(state.selectedRows).forEach((id) => {
      state.data.splice(state.selectedRows[id], 1);
    });
    state.selectedRows = {};
    localStorage.setItem('l23h4o2upqsaf', JSON.stringify(state.data));
    this.setState(state);
  }

  render() {
    return <div className="container">
      <div className="header">
        <div className="header-title">Ваш личный словарик</div>
        <div className="header-version">v1.0.1</div>
      </div>

      <div className="divider"></div>

      <div className="input-container">
        <div>
          Eng <input value={this.state.wordInputValue} name="wordInputValue" onChange={this.handleChangeInputValue} />
        </div>
        <div>
          Rus <input value={this.state.transleteInputValue} name="transleteInputValue" onChange={this.handleChangeInputValue} />
        </div>
        <button style={{ marginTop: '5px' }} onClick={this.handleOnCreateRow}>{this.state.isEditNow != undefined ? 'Изменить' : 'Создать'}</button>
      </div>

      <div className="divider"></div>

      <div style={{ margin: '10px' }}>
        <button disabled={Object.keys(this.state.selectedRows).length != 1} onClick={this.handleOnEditRow}>Редактировать</button>
        <button disabled={Object.keys(this.state.selectedRows).length == 0 || this.state.isEditNow != undefined} onClick={this.handleOnDeleteRow}>Удалить</button>
      </div>

      <div className="divider"></div>

      <div className="rows-container">
        {
          this.state.data.map((o, i) => {
            const id = `${i}${o.word.split(' ').join('')}${o.translate.split(' ').join('')}`;
            return <div onClick={this.handleOnSelectRow.bind(this, id, i)} className="row-card" key={id}>
              <div className="word">{o.word}</div>
              <div className="translate">{o.translate}</div>
              <div className="checkbox-container">
                <input disabled={this.state.isEditNow != null} onChange={this.handleOnChangeUnused} checked={this.state.selectedRows[id] != undefined || false} type="checkbox" />
              </div>
            </div>
          })
        }
      </div>

    </div>
  }
}

export default App
