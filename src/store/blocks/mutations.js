export const setBlocks = (state, blocks) => {
  state.blocks = blocks;
};

export const setBlock = (state, newBlock) => {
  state.blocks = state.blocks.map((block) => {
    if (block.id === newBlock.id) {
      block = { ...block, ...newBlock };
    }
    return block;
  });
};

export const addBlock = (state, newBlock) => {
  state.blocks.push(newBlock);
};

export const setCurrentBlock = (state, currentBlock) => {
  state.currentBlock = currentBlock;
};

export const setCurrentBlockId = (state, currentBlockId) => {
  state.currentBlockId = currentBlockId;
};

export const setSavingBlock = (state, savingBlock) => {
  state.savingBlock = savingBlock;
};

export const setLoadingBlocks = (state, loadingBlocks) => {
  state.loadingBlocks = loadingBlocks;
};

