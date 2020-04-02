class Block{
	constructor( {timestamp, lastHash, data, hash} ){
		this.timestamp = timestamp;
		this.lastHash = lastHash;
		this.data = data;
		this.hash = hash;
	}
}

const block1 = new Block({
	lastHash:'foo-lastHash', 
	data:'foo-data', 
	hash:'foo-hash',
	timestamp:'123'
	});

console.log('block1', block1);