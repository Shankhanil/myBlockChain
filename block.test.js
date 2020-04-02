const Block = require('./block');
const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./crypto-hash');
describe('Block', () => {
	const timestamp = 'a-date';
	const lastHash = 'foo-hash';
	const data = ['foo-data', 'bar-data'];
	const hash = 'bar-hash';
	const block = new Block({
		timestamp: timestamp,
		lastHash: lastHash,
		hash: hash,
		data: data});
	it('has a timestamp, lasthash, hash, data property', () => {
		expect(block.timestamp).toEqual(timestamp);
		expect(block.hash).toEqual(hash);
		expect(block.lastHash).toEqual(lastHash);
		expect(block.data).toEqual(data);
	});
	
	describe('genesis()', () => {
		const genesisBlock = Block.genesis();
		
		it('returns a block instance', () => {
			expect(genesisBlock instanceof Block).toBe(true);
		});
		
		it('returns the genesis data', () => {
			expect(genesisBlock).toEqual(GENESIS_DATA);
		});
		
		//console.log('genesisBlock', genesisBlock);
	});
	
	describe('mineBlock()', () => {
		const lastBlock = Block.genesis();
		const data = 'mined data';
		const minedBlock = Block.mineBlock({ lastBlock, data });
		
		it('returns a block instance', () => {
			expect(minedBlock instanceof Block).toBe(true);
		});
		
		it('sets the \'lasthash\' to be the \'hash\' of the lastBlock',
		() => {
			expect(minedBlock.lastHash).toEqual(lastBlock.hash);
		});
		it ('sets the data', () => {
			expect(minedBlock.data).toEqual(data);
		});
		
		it ('sets the timestamp', () => {
			expect(minedBlock.timestamp).not.toEqual(undefined);
		});
		
		it('creates a SHA 256 hash based on proper inputs', () => {
			expect(minedBlock.hash).
			toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data));
		});
	});
});