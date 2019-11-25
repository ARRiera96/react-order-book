import React from 'react';

const PairSelector = ({pairsByGroupAbrv, defaultAssetPair, setAssetPair}) =>  {
    return (
        <select
        value={defaultAssetPair}
        onChange={e => setAssetPair(e.target.value)}>
            {Object.keys(pairsByGroupAbrv).map((assetGroup) => {
                return (
                    <optgroup key={assetGroup} label={assetGroup}>
                        {
                            pairsByGroupAbrv[assetGroup].map((assetPair) => {
                                return (
                                    <option key={assetPair.assetPair} value={assetPair.assetPair}>{assetPair.wsname}</option>
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
