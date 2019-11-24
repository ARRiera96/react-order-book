import React from 'react';

const PairSelector = ({assetPairs}) =>  {
    return (
        <select>
            {Object.keys(assetPairs).map((assetGroup, i, arr) => {
                return (
                    <optgroup key={assetGroup} label={assetGroup}>
                        {
                            assetPairs[assetGroup].map((assetPair) => {
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
};

export default PairSelector;
