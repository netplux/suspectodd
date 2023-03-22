import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

const GoogleAdSenseFiller = () => {
  const history = useHistory();
  return (
    <div style={{ display: "block", width: "800px" }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.push("/choose-player")}
        style={{ marginTop: "10px" }}
      >
        Play the Game
      </Button>
      <div style={{ marginTop: "10px" }}>
        Board games are tabletop games that typically use pieces moved or placed
        on a pre-marked board (playing surface) and often include elements of
        table, card, role-playing, and miniatures games as well. Most feature a
        competition between two or more players. In checkers, a player wins by
        capturing all opposing pieces, while Eurogames often end with a
        calculation of final scores. Pandemic is a cooperative game where
        players all win or lose as a team, and peg solitaire is a puzzle for one
        person. There are many varieties of board games. Their representation of
        real-life situations can range from having no inherent theme, such as
        checkers, to having a specific theme and narrative, such as Cluedo.
        Rules can range from the very simple, such as in Snakes and Ladders; to
        deeply complex, as in Advanced Squad Leader. The time required to learn
        to play or master a game varies greatly from game to game, but is not
        necessarily correlated with the number or complexity of rules; games
        like chess or Go possess relatively simple rulesets, but have great
        strategic depth.[1]
      </div>
      <span>
        <h3>Skip Phase Jump</h3>
        <p>
          The Skip Phase is the first part of a player's turn, before the Roll
          Phase. The phase is always invisible. The only effects which can
          activate in this phase are Skip-A-Turn, Incapacitation, and Rooster's
          passive. If you have either 1 or both of these statuses without
          Rooster activating, the skip activates, the status(es both) wear(s)
          off, and you get no further phases in your turn aside from the Effects
          Phase and a possible Forced End. If you have neither status, your turn
          goes on normally. Note that this phase is not included in a turn
          restarted by Objection!'s Class Talent, etc. (However, this phase is
          included in an Extra Turn.)
        </p>
      </span>
      <span>
        <h2>Board Games</h2>
        <hr />

        <h3>Risk</h3>
        <p>
          The game of global domination. Risk involves controlling an army of
          infantry, cavalry, and even artillery to take over territories and
          slowly eliminate your enemies. You may form or dissolve alliances to
          get ahead, as well as capture entire continents for bonus troops. This
          website allows up to six players to a private game. They also have
          single-player campaigns if you'd like to play solo. Find it here.
        </p>
      </span>
      <span>
        <h3>Trivia Round Robin</h3>
        <p>
          Pretty much every person on the planet has at least one trivia-related
          game stashed in their closet. So have all of your fellow gamers bring
          a deck of trivia cards (any trivia cards!) from the stash in their
          house (Star Wars Trivial Pursuit? Sure!) and see who reigns supreme.
          First person to rack up 10 correct answers wins the round.
        </p>
      </span>
      <span>
        <h3>Scattergories</h3>
        <p>
          This wordy classic, where you fill in answers based on a series of
          arbitrary categories and a beginning letter (i.e., types of candy
          starting with S), easily translates to a virtual environment. You can
          do a little bit of pre-game prep by typing out a set of potential
          categories for everyone to use, then roll your own letter die—or use
          this free online Scattergories generator someone created that gives
          you a letter and a built-in timer along with the categories.
        </p>
      </span>
      <span>
        <h3>Pictionary</h3>
        <p>
          Split your virtual party crew into two teams for this draw-and-guess
          game. The designated drawers can use Pictionary decks or an online
          Pictionary generator to get the word they’re trying to get their team
          to guess in the allotted time. Drawers can aim their cameras at their
          artwork as they draw with pen and paper, or draw online using their
          favorite drawing app and sharing their screen. The real game uses a
          board, but instead, just aim for a certain point score to declare the
          winner.
        </p>
      </span>
      <span>
        <h3>dice-breaker</h3>
        <p>
          One of the best things about board games versus playing games online
          is being together with friends, family or even strangers in the same
          room. It’s not just party board games that serve as a reason to get
          together in person and socialise; games of all kinds have the power to
          get people chatting and interacting in a way that digital offerings
          such as video games just can’t match. But sometimes you simply can’t
          be in the same place as your preferred players - whether that’s due to
          a common problem like living far apart or something specific and
          unusual like, say, social distancing during a global period of
          self-isolation. There’s no need to miss out on your tabletop hobby
          when you can’t meet up in person, however - there are loads of ways to
          play board games online with friends.
        </p>
        <p>
          Things have come a long way since the days of playing chess by mail.
          There are more ways than ever to play some of the most popular board
          games online with friends, from setting up a simple video call to play
          TCGs such as Magic: The Gathering to more elaborate apps and digital
          replacements that elegantly swap plastic for pixels and cardboard for
          code. Working out how to play board games online with friends doesn’t
          mean you need to be a tech whizz, own a powerful gaming PC or video
          game console, or even have any board games of your own. There are
          great options for playing some of the very best board games online for
          free, as well as those that - if you have a little more budget - can
          offer you a unique experience when playing with friends in the virtual
          world.
        </p>
      </span>
    </div>
  );
};

export default GoogleAdSenseFiller;
