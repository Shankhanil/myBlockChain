const Blockchain = require('./blockchain');
const Block = require('./block');

describe('BLockchain', () => {
	let blockchain, newChain, originalChain ;
	
	beforeEach(() =>{
		blockchain = new Blockchain();
		newChain = new Blockchain();
		originalChain = Blockchain.chain;
	});
	
	it('contains a chain Array instance', ()=>{
		expect(blockchain.chain instanceof Array).toBe(true);
	});
	
	it('starts with genesis block', ()=>{
		expect(blockchain.chain[0]).toEqual(Block.genesis());
	});
	
	it ('adds a new block to the chain', () => {
		const newData = 'foo bar';
		blockchain.addBlock({data: newData});
		
		expect(blockchain.chain[blockchain.chain.length -1].data)
		.toEqual(newData);
	});
	
	
	describe('isValidChain()', ()=> {
		
		describe('when the chain does not start with genesis block', 
		() =>{
			it('returns false', () =>{
				blockchain.chain[0] = {data : 'fake-genesis' };
				expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
			});
		});
		describe('when the chain starts with genesis block and have multiple block',		
		() =>{
			
			beforeEach(() =>{
				blockchain.addBlock('A1');
				blockchain.addBlock('B1');
				blockchain.addBlock('c1');
				
			});
			
			describe('and a lastHash ref has changed', () => {
				it('returns false', () =>{
					
					blockchain.chain[2].lastHash = 'broken-lastHash';
					
					expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
				});
			});
			describe('and chain contains block with invalid field', () => {
				it('returns false', () => {
					
					blockchain.chain[2].data = 'some-bad-data';
					
					expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
				});
			});		
			describe('and chain not contains block with invalid field', () => {
				it('returns true', () => {
					
					expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
				});
			});
		});		
	});
	
	describe('replaceChain()', ()=>{
		describe('when the new chain is not longer', ()=>{
			it('does not replace the chain', ()=> {
				
				newChain.chain[0] = {data : 'chain'};
													  
				blockchain.replaceChain(newChain.chain);
				expect(blockchain.chain).toEqual(originalChain);
			});
		});
		
		describe('when the new chain is longer', ()=>{
			
			beforeEach(() =>{
				newChain.addBlock({ data:'A1' });
				newChain.addBlock({ data:'B1' });
				newChain.addBlock({ data:'C1' });
				
			});
			
			describe('when the chain is invalid', ()=> {
				it('does not replace the chain', ()=> {
					newChain.chain[2].hash = 'invalid-hash';
					blockchain.replaceChain(newChain.chain);
					expect(blockchain.chain).toEqual(originalChain);
				});
			});
			describe('when the chain is valid', ()=> {
				it('replace the chain', ()=> {
					blockchain.replaceChain(newChain.chain);
					expect(blockchain.chain).toEqual(newChain.chain);
				});
			});
		});
	});
});