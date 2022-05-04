import React from 'react';

class NumberRow extends React.Component {

    render() {
        const { number, onSelectClick, onUnSelectClick, isSelected, isLocked } = this.props;

        return (
            <tr>
                <td>{number}</td>
                <td>
                    <button className={`btn btn-${isSelected ? 'danger' : 'primary'}`} disabled={isLocked}
                        onClick={isSelected ? onUnSelectClick : onSelectClick}>
                        {isSelected ? 'Remove from Selected' : 'Add to Selected'}
                    </button>
                </td>
            </tr>
        );
    }
}

export default NumberRow;