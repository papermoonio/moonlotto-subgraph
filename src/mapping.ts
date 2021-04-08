import {
  PlayerJoined,
  LotteryResult,
} from "./types/MoonLotto/MoonLotto";
import { Round, Player, RoundPlayer, Winner } from "./types/schema";

export function handlePlayerJoined(event: PlayerJoined): void {
  // ID for the player == issuer address
  let playerId = event.params.player.toHex();
  // try to load Player from previous rounds
  let player = Player.load(playerId);
  // if player doesn't exists, create it
  if (player == null) {
    player = new Player(playerId);
  }

  // ID for the round == round number
  let roundId = event.params.round.toString();
  // try to load Round from a previous player
  let round = Round.load(roundId);
  // if round doesn't exists, it's the first player in the round -> create round
  if (round == null) {
    round = new Round(roundId);
  }
  round.index = event.params.round;
  round.currentPrize = event.params.prizeAmount;

  round.save();

  // ID for the roundPlayer == "round_number" + "-" + "player_address" 
  let roundPlayerId = roundId + "-" + playerId;
  // try to load Round from a previous player
  let roundPlayer = RoundPlayer.load(roundPlayerId);
  // if roundplayer doesn't exists, create it
  if (roundPlayer == null) {
    roundPlayer = new RoundPlayer(roundPlayerId);
  }
  roundPlayer.round = roundId;
  roundPlayer.player = playerId;

  roundPlayer.save();
  
  // update player fields
  player.address = event.params.player;
  player.isGifted = event.params.isGifted;
  player.save();
}

export function handleLotteryResult(event: LotteryResult): void {
  let playerId = event.params.winner.toHex();  
  let roundId = event.params.round.toString();  
  // ID of the winner == "round_number" + "-" + "player_address" 
  let winnerId = roundId + "-" + playerId;
  let winner = new Winner(winnerId);

  // ID for the round == round number
  let round = Round.load(roundId);

  round.currentPrize = event.params.prizeAmount;
  
  round.save();

  winner.player = playerId;
  winner.round = roundId;
  winner.prize = event.params.prizeAmount;
  winner.timestamp = event.params.timestamp;
  winner.save();
}
