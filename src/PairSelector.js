import React from 'react';

const PairSelector = (assetGroups) =>  {
    return (
        <select>
            <option>All</option>
            {Object.keys(assetGroups).map((assetGroup, i, arr) => {
                return (
                    <optgroup label={assetGroup}>
                        {
                            arr[assetGroup].map((assetPair) => {
                                return (
                                    <option key={assetPair} value={assetPair}>{assetPair}</option>
                                )
                            })
                        }
                    </optgroup>
                );
            })}
        </select>
    )
}

export default PairSelector; 
