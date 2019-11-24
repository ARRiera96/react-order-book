import React from 'react';

const PairSelector = ({assetPairs, defaultAssetPair, setAssetPair}) =>  {
    return (
        <select
        value={defaultAssetPair}
        onChange={e => setAssetPair(e.target.value)}
        >
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
