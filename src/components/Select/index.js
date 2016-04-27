import React, { Component, PropTypes } from 'react';
import IconButton from '../IconButton';

class Select extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        collection: PropTypes.array,
        itemId: PropTypes.string,
        itemName: PropTypes.string,
        nameField: PropTypes.string,
        placeholder: PropTypes.string,
        error: PropTypes.string,
        onChange: PropTypes.func,
        clearButton: PropTypes.bool,
        readOnly: PropTypes.bool,
        getCollection: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = this.initState(props);
        if (props.itemId) this.fetchItem(props.itemId);
        else if (props.getCollection) this.fetchCollection('', true);

        this.handleItemNameChange = this._handleItemNameChange.bind(this);
        this.onClick = this._onClick.bind(this);
        this.onBlur = this._onBlur.bind(this);
        this.onClear = this._onClear.bind(this);
    }

    componentWillReceiveProps(props) {
        if (this.props.collection != props.collection) {
            this.setState(this.initState(props));
        }
    }

    initState(props) {
        let item;
        if (props.collection) {
            if (props.itemId) item = props.collection.find(el => el._id == props.itemId);
            else if (props.itemName) item = props.collection.find(el => el.name == props.itemName);
        }
        return {
            item: item || {},
            itemName: item && item[props.nameField] || props.itemName || '',
            hideOptions: true,
            searchCollection: [],
            restCollection: props.collection || []
        };
    }

    filterCollection(collection, value, hideOptions) {
        let item = collection.find(el => el[this.props.nameField] == value);
        this.props.onChange(item);
        let [searchCollection, restCollection] = this.searchFilter(
            collection, item, this.props.nameField, value);
        this.setState({
            item,
            hideOptions,
            searchCollection,
            restCollection
        });
    }

    fetchItem(id) {
        let data = {id, fields: {[this.props.nameField]: true}};
        this.props.getCollection({
            data,
            callback: collection => {
                let itemName = collection[0][this.props.nameField];
                this.setState({itemName});
                this.fetchCollection(itemName, true)
            }
        });
    }

    fetchCollection(value, hideOptions) {
        let data = {fields: {[this.props.nameField]: true}, notEnough: true};
        if (value) data.search = value;
        this.props.getCollection({
            data,
            callback: collection => this.filterCollection(collection, value, hideOptions)
        });
    }

    _handleItemNameChange(e, hideOptions = false) {
        let value = e.target.value;
        this.setState({itemName: value});
        if (this.props.getCollection) this.fetchCollection(value, hideOptions);
        else this.filterCollection(this.props.collection, value, hideOptions);
    }

    searchFilter(collection, item, nameField, value) {
        if (!value) return [[], collection];
        value = value.toLowerCase();
        let search = [], rest = [];
        if (item || !value.trim().length) rest = collection;
        else for (let el of collection) {
            if (el[nameField].toLowerCase().includes(value)) search.push(el);
            else rest.push(el);
        }
        return [search, rest];
    }
    
    isValid() {
        return !!(this.state.item && !this.props.error || !this.state.itemName.length);
    }

    showHideOptions(hideOptions) {
        if (!hideOptions && this.cleared) this.cleared = false;
        else this.setState({hideOptions});
    }

    setItem(item) {
        this.itemSet = true;
        this.props.onChange(item);
        let state = {
            item, itemName: item && item[this.props.nameField] || this.state.itemName,
            hideOptions: true
        };
        Object.assign(state, {
            searchCollection: [],
            restCollection: this.props.getCollection ?
                this.state.searchCollection.concat(this.state.restCollection)
                    .sort((el1, el2) => el1[this.props.nameField] > el2[this.props.nameField])
                : this.props.collection
        });
        this.setState(state);
    }

    _onClick() {
        if (this.props.readOnly) return;
        this.showHideOptions(false);
    }

    _onBlur() {
        if (this.props.readOnly) return;
        if (!this.itemSet) this.showHideOptions(true);
        else this.itemSet = false;
    }

    _onClear() {
        if (this.props.readOnly) return;
        this.cleared = true;
        this.handleItemNameChange({target: {value: ''}}, true);
    }

    render () {
        return (
            <div className={`select ${this.props.className || ''}`}>
                <label className={!this.isValid() && 'is-invalid-label' || ''}>
                    {this.props.children}
                    <input className={!this.isValid() && 'is-invalid-input' || ''} readOnly={this.props.readOnly}
                           onClick={this.onClick} onBlur={this.onBlur}
                           type="text" placeholder={this.props.placeholder}
                           value={this.state.itemName} onChange={this.handleItemNameChange} />
                    {this.props.clearButton && this.state.itemName.length &&
                        <IconButton className="mdi-close-circle clear-button" title="Clear" onClick={this.onClear}/>
                    || ''}
                    <span className={`form-error ${!this.isValid() && 'is-visible' || ''}`}>
                        {this.props.error}
                    </span>
                </label>
                <div className={`options ${this.state.hideOptions && 'hide' || ''}`}>
                    {this.state.searchCollection.map((item, index) =>
                        <div className={`item search `} key={index} onMouseDown={() => this.setItem(item)}>
                            {item[this.props.nameField]}
                        </div>
                    )}
                    {this.state.restCollection.map((item, index) =>
                        <div className={`item rest `} key={index} onMouseDown={() => this.setItem(item)}>
                            {item[this.props.nameField]}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Select;
