import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { convertDate } from '../../lib/time.js';
import DatePicker from '../../lib/index';
// import DatePicker from '../../dist/react-mobile-datepicker.js';

(function main() {
    const BACKGROUNDS = {
        'yellow': '#ffa70b',
        'blue': '#0483bc',
        'black': '#333',
    };

    class App extends React.Component {
        state = {
            time: new Date(),
            isOpen: false,
            layerBackground: BACKGROUNDS.yellow,
        }

        handleClick = () => {
            this.setState({ isOpen: true });
        }

        handleBackgroundClick = (background) => () => {
            this.setState({ layerBackground: BACKGROUNDS[background] });
        }

        handleSelect = (time) => {
            this.setState({ time, isOpen: false });
        }

        render() {
            return (
                <div className="App">
                    <a
                        className="select-btn"
                        onClick={this.handleClick}>
                        select time
                    </a>
                    <p className="select-time ">
                        {convertDate(this.state.time, 'YYYY-MM-DD')}
                    </p>
                    <div>
                        <a
                            className="select-btn sm"
                            style={{ background: BACKGROUNDS.yellow }}
                            onClick={this.handleBackgroundClick('yellow')}>
                            yellow
                        </a>
                        <a
                            className="select-btn sm"
                            style={{ background: BACKGROUNDS.blue }}
                            onClick={this.handleBackgroundClick('blue')}>
                            blue
                        </a>
                        <a
                            className="select-btn sm"
                            style={{ background: BACKGROUNDS.black }}
                            onClick={this.handleBackgroundClick('black')}>
                            black
                        </a>
                    </div>
                    <DatePicker
                        layerBackground={this.state.layerBackground}
                        date={this.state.time}
                        isOpen={this.state.isOpen}
                        onSelect={this.handleSelect} />
                </div>
            );
        }
    }


    ReactDOM.render(<App />, document.getElementById('react-box'));
}());
