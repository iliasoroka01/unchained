// tendermint types are copies from: https://github.com/tendermint/tendermint/blob/v0.32.3/types

package binance

import (
	commontypes "github.com/shapeshift/bnb-chain-go-sdk/common/types"
)

type Block struct {
	commontypes.Header `json:"header"`
}

type BlockMeta struct {
	BlockID            commontypes.BlockID `json:"block_id"`
	commontypes.Header `json:"header"`
}

type ResultBlock struct {
	BlockMeta BlockMeta `json:"block_meta"`
	Block     Block     `json:"block"`
}