import React from 'react';
import NumberRow from './NumberRow';
import SelectedNumbersList from './SelectedNumbersList';
import produce from 'immer';

class NumberTable extends React.Component {
    state = {
        numbers: [],
        selectedNumbers: [],
        lockedNumbers: []
    }

    onAddButtonClick = () => {
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        const newState = produce(this.state, draftState => {
            draftState.numbers.push(getRndInteger(1, 1000));
        });
        this.setState(newState);
    }
    onSelectClick = n => {
        const newState = produce(this.state, draftState => {
            draftState.selectedNumbers.push(n);
        })
        this.setState(newState);
    }
    onUnSelectClick = n => {
        const selectedNumbers = this.state.selectedNumbers.filter(sn => n !== sn)
        this.setState({ selectedNumbers });
    }
    isSelected = n => {
        const { selectedNumbers } = this.state;
        return selectedNumbers.some(sn => sn === n);
    }
    generateNumberTable = () => {
        return (
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Add/Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.numbers.map((n, i) => {
                        return <NumberRow
                            number={n}
                            key={i}
                            onSelectClick={() => this.onSelectClick(n)}
                            onUnSelectClick={() => this.onUnSelectClick(n)}
                            isSelected={this.isSelected(n)}
                            isLocked={this.isLocked(n)} />
                    })
                    }
                </tbody>
            </table>
        )
    }
    onLockButtonClick = ln => {
        const newState = produce(this.state, draftState => {
            draftState.lockedNumbers.push(ln);
        })
        this.setState(newState);
    }
    onUnlockButtonClick = n => {
        const lockedNumbers = this.state.lockedNumbers.filter(ln => n !== ln)
        this.setState({ lockedNumbers });
    }
    isLocked = sn => {
        const { lockedNumbers } = this.state;
        return lockedNumbers.some(ln => ln === sn)
    }

    generateSelectedNumbersList = () => {
        return (
            <div className='jumbotron'>
                <h1>Selected Numbers</h1>
                <div className='row mt-5'>
                    <ul className='list-group'>
                        {this.state.selectedNumbers.map((sn, i) => {
                            return <SelectedNumbersList
                                selectedNumber={sn}
                                key={i}
                                onLockButtonClick={() => this.onLockButtonClick(sn)}
                                onUnlockButtonClick={() => this.onUnlockButtonClick(sn)}
                                isLocked={this.isLocked(sn)}
                            />
                        })}
                    </ul>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div className='container'>
                <div className='row mt-5'>
                    <button onClick={this.onAddButtonClick} className='btn btn-success btn-block btn-large'>Add</button>
                </div>
                <div className='row mt-3'>
                    {this.generateNumberTable()}
                </div>
                <div className='row mt-3'>
                    {!this.state.selectedNumbers.length && ''}
                    {!!this.state.selectedNumbers.length && this.generateSelectedNumbersList()}
                    {console.log(this.state.lockedNumbers)}
                </div>
            </div>
        );
    }
}

export default NumberTable;
