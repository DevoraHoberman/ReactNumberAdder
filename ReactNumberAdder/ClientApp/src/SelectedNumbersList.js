import React from 'react';

class SelectedNumbersList extends React.Component {

    render() {
        const { selectedNumber, onLockButtonClick, onUnlockButtonClick, isLocked } = this.props;

        return (
            <li className='list-group-item'>{selectedNumber}
                <button className='btn btn-primary btn-block' onClick={isLocked ? onUnlockButtonClick : onLockButtonClick}>
                    {isLocked ? 'Unlock' : 'Lock'}
                </button>
            </li>
        );
    }
}

export default SelectedNumbersList;