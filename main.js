let runCard= (function(){
    var url="https://deckofcardsapi.com/api/deck/new/draw/?count=5"

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        // console.log(data.cards[1].value)
        
        let newArr =[]
        for(i=1;i<=data.cards.length;i++){
            if(data.cards.value !== "WILD" || data.cards.value !== "JOKER"){
            document.getElementById(`${"img"+i}`).src=`${data.cards[i-1].image}`
                newArr.push(data.cards[i-1].value)
        }
        
        }

        console.log(newArr)

    
        
        let cardValueMap = {
            "ACE":14,
            "KING":13,
            "QUEEN":12,
            "JACK":11,
            "10":10,
            "9":9,
            "8":8,
            "7":7,
            "6":6,
            "5":5,
            "4":4,
            "3":3,
            "2":2

        };

        var straight = [] 
        for(x=0;x<newArr.length;x++){
          for(y=0;y<cardValueMap.length;y++){
              if(cardValueMap[y].key == newArr[x]){
                straight.push(cardValueMap[y].value)
                console.log(straight)
           }
          }   
        }
        console.log(straight)
        

        let biggestCard =data.cards[0];
        // let sameCards =[data.cards[0].value]


        for(card of data.cards.slice(1)){
           
            if(cardValueMap[card.value] > cardValueMap[biggestCard.value]){
                biggestCard = card
            }   
        }

        
            
        
        let sameCards =newArr.reduce(function(o,k){
            if(k in o){
                o[k]++
            }else{
                o[k] = 1
            }

            return o;
        },{});

        console.log(sameCards)
        let pairs =0

        for(key in sameCards){
            
            if(sameCards[key] == 2){
                pairs++
            }else  if(sameCards[key] == 3){
                document.getElementById("pairs").innerHTML="there is FullHouse!"
            }
        }

        console.log(pairs)

        document.getElementById("higest").innerHTML="the highest is " + biggestCard.value
        if(pairs!==0 && pairs !==3)

        {
            document.getElementById("pairs").innerHTML="</br>there is " + pairs +"pairs"
        }
        
    })
})()