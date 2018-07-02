import React from "react";
import axios from 'axios';

const API_KEY = '37662c76ffc19e5cd1b95f37d77155fc';

function Option(props) {
    return <div><a href="#">{props.value}</a></div>;
}

export class Form extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            input: '',
            found: []
        };
    }

    handleChange(e) {
        let foundOptions = [];
        const value = e.target.value.toLowerCase();
        const self = this;
        if (value !== '') {
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ru-RU&sort_by=popularity.desc&page=1`)
                .then((response) => {
                    response.data.results.forEach(function (item) {
                        if (item.title.toLowerCase().search(value.toLowerCase()) !== -1) {
                            const element = <Option value={item.title} />;
                            foundOptions.push(element);
                        }
                        self.setState({
                            found: foundOptions,
                            input: value
                        });
                    });
                })
                .catch((error) => {
                    console.log('Ошибка: ' + error.message);
                });
        } else {
            this.setState({
                input: value,
                found: []
            });
        }
    }

    handleClick() {
        store.dispatch({type: 'SEND_REQUEST', request: this.state.found});
    }

    render() {
        return (
            <div>
                <div>
                    <input value={this.state.input} onChange={(e) => this.handleChange(e)} />
                    <button onClick={this.handleClick}>Click</button>
                </div>
                <div>
                    {this.state.found}
                </div>
            </div>
        );
    }
}