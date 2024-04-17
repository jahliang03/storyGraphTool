class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
        //this.engine.keyObtained = this.engine.storyData.keyObtained;
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices != null) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                //this.engine.addChoice(choice.Text,choice); // TODO: use the Text of the choice 
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                if(choice.Target === "Unlock Secret Room" && !this.engine.keyObtained ) {
                    // If the player hasn't obtained the key, do not navigate to the Secret Room
                    this.engine.show("It seems like you need a key to open the lock.");
                } 
                else {
                    // Otherwise, navigate to the target location
                    //this.engine.gotoScene(Location, choice.Target);
                    this.engine.addChoice(choice.Text,choice);
                }
            } 
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            // If keyObtained is set in the choice data, update the engine's keyObtained
            if (choice.keyObtained !== undefined) {
                this.engine.keyObtained = choice.keyObtained;
            }
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');


//partner Dylan Boyer for fxing