pragma solidity >= 0.7.0 < 0.9.0;

contract Lottery{
      address public manager;
      address[] public players; 

     constructor () public {
         manager = msg.sender;
     }

     function enter() public payable {
         require(msg.value > 0.1 ether);
         players.push(msg.sender);
     }

     function getPlayers(uint index) public view returns(address){
         return players[index];
       }

     function pickWinner() public payable onlyManager{
         uint index = random() % players.length;
         uint amount = address(this).balance;
         address payable sendAdd = payable(players[index]);
         transferTo(sendAdd , amount);
         players = new address[](0);
     }

    function transferTo(address payable dest, uint amount) public payable onlyManager {
        dest.transfer(amount);
    }

   function random() private view returns(uint){
      return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,players)));                                  
   }

modifier onlyManager(){
    require(msg.sender == manager);
    _;
}

}
