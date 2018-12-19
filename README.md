# Tap Escape

Tap Escape is a fast paced mobile puzzle game. Navigate dungeons and find hidden keys to escape. 

## Gameplay

The player is presented with a top down view of one room at a time. The player can navigate between rooms by tapping on doors or stair cases that link the rooms. Tapping on objects in the room cause actions to happen. The player can pick up items and add them to their inventory to use later. The goal of the game is to complete a certain action, either exiting through a door, finding a certain item, etc that has the win condition associated with it. Graphics are 32 bit quality to give the game a retro feel as well as make it easier to mass produce images.

## The Map

Every new level is called a map. Each map can contain one or more [Rooms](). Every map must have at least one game object with a win behavior. Defining a map requires 5 elements:
- Rooms
- Game Objects
- Items
- Inventory
- Intro Message

## Rooms

Each room is made up of a 7x7 grid. Generally, the outside elements of the grid will be wall pieces. Every room maintains it's state for the entirety of the level even if you leave the room and come back. See the list of available images for the room grid. There can be [game objects]() or [items]() in the room layered howerever the map designer sees fit as long as they work within the 7x7 grid system. Grid squares are labeled with letters down the Y axis and numbers across the X axis. So the top left grid space is A1 and the bottom right is G7.

```
A1  A2  A3  A4  A5  A6  A7

B1  B2  B3  B4  B5  B6  B7

C1  C2  C3  4   C5  C6  C7

D1  D2  D3  D4  D5  D6  D7

E1  E2  E3  E4  E5  E6  E7

F1  F2  F3  F4  F5  F6  F7

G1  G2  G3  G4  G5  G6  G7
```

Every room must have it's layout defined first. Using a grid system similar to the one shown above, each item in the grid should correspond to one of the [available map images]().
For example, if the identifier for a stone floor is "SF1" and a stone wall is "SW1" then a simple stone room would be defined as follows.

```
rooms:
    stone_room_1:
        SW1  SW1  SW1  SW1  SW1  SW1  SW1

        SW1  SF1  SF1  SF1  SF1  SF1  SW1

        SW1  SF1  SF1  SF1  SF1  SF1  SW1

        SW1  SF1  SF1  SF1  SF1  SF1  SW1

        SW1  SF1  SF1  SF1  SF1  SF1  SW1

        SW1  SF1  SF1  SF1  SF1  SF1  SW1

        SW1  SW1  SW1  SW1  SW1  SW1  SW1
```


## Game Objects

Game objects can exist anywhere on the map either on the floor or on the walls and are the primary interaction points for the game.

### Appearance

Game Objects can be assined any one of the available images provided. Each image is designated an identifier. When assigning an image to a game object, [Conditions]() can be set as well. 

### Placement
 Every game object has must be placed in a room and has an origin point which is assigned to a grid space as well as a facing direction. Directions are denoted in North, South, East, and West. For example a game object like a bed might be 2 spaces long and 1 space wide. If the bed was going to be placed in the top left corner of the map it would be placed at A1 facing East. or A1 facing South. Placing the bed at A1 facing North would be invalid because the bed would extend outside the map. Here is an example:

 ```
 position: "library_room_3" B4 facing South
 ```

 ### Appearance

 An object must be given an appearance. If the object only has one state the appearance can be defined on its own. Otherwise see the next section for defining a different appearance for each state. Here is an example of stating the appearance of a box.
```
appearance: "box_3"
```

 ### States

 Game objects can have multiple states. States can be any unique string value like `open` or `tried_twice`. States are used primarily by [Behaviors](). Each state can optionally define a different appearance for the object but this isn't a requirement. If no appearance is defined for a state then the appearance won't change when the state changes. Below is an example of defining the states of a desk with a drawer:
 ```
 states:
    drawer_closed:
        appearance: "desk_drawer_closed"
    drawer_open
        appearance: "desk_drawer_open" 
 ```

### Behaviors

Game objects can be interacted with in several different ways. Anything a game object does is called a Behavior. Every behavior consists of up to 3 components. The **trigger**, the **event**, and one or more **condition**.

#### 1. Triggers
There are two available triggers that can initiate a Behavior: **Tap**, and **Add Item**. The tap trigger is hit when the user taps anywhere on the game object. The Add Item trigger is hit when the uer first taps an item in their inventory, then taps on the game object.

#### 2. Events

The second part of the behavior, the event, is what happens when the trigger gets hit. The following is a list of available events

- Add/Remove: A game object can be added or removed from the map. 
- Change state: A game objects state can be changed to anything
- Add/Remove item: An item can be added or removed from either a game object or the inventory
- Navigate: Move to a different room in the map. 
- Info: Present any text to the user. 
- End game: Finish the level and proceed to the next


#### 3. Conditions

A condition can be added to a behavior to determine if it should happen based on other elements in the game. Any number of conditions can be added to a behavior and _they must all be true for the event to fire_. If no conditions are set then the behavior will always fire. Here is the list of possible conditions:

- State: Check to see if a game object has a given state
- Contains Item: Check to see if either a game object has an item or the item exists in the users inventory

As an example, suppose the game designer wants a chest to open if the user has collected the key. The behavior might be built as follows:

```
behaviors:
    open_chest:
        trigger: tap
        event: change state of "chest_1" to "open"
        conditions: 
            state of "chest_1" is "closed"
            inventory contains "key_1"
```

The following demonstrates defining an entire game object. This object is a bookcase. When the right book is added to it, it opens revealing a secret passage:

```
game_objects:
    secret_bookcase
        position: "outer_room_3" A3 facing East
        states:
            closed:
                appearance: "normal_bookcase"
            open: 
                appearance: "open_bookcase"
        behaviors:
            open_on_book_added:
                trigger: add item
                event: change state of "secret_bookcase" to "open"
                conditions:
                    state of "secret_bookcase" is "closed"
                    "secret_bookcase" contains item "book_key"
            navigate:
                trigger: tap
                event: move to "inner_room_1"
                conditions:
                    state of "secret_bookcase" is "open"
            hint:
                trigger: tap
                event: message "There is a light draft here..."
                conditions:
                    state of "secret_bookcase" is closed
```



## Items

Items are objects in the game that can be picked up or placed. to trigger certain behaviors. Every item only has a single state and appearance. 

### Picking up an Item
When an item on the map is tapped it is automatically added to the users inventory as long as there is space. If there is no space a message will be shown to the player which says "No space for this item in your inventory". 

### Inspecting an Item
Once an item is in the inventory it can be either inspected or placed back on the map. To inspect an item the player can tap it and a message will be displayed.

### Placing an Item
 The player can place an item on the map by first tapping it and then taping anywhere on the map to place it. 

### Initial Position

Items are defined with an initial postion. This position can either be a grid square or a game object. The initial positionc an be accompanied by a list of conditions. Here is an example of how to define a key that starts in a chest.

```
items:
    key_1
        Initial Position: "chest_1" 
        Conditions:
            - State of "chest_1" is "open"
```

If the game object takes up more than one space and the item shoud exist at a specific place on the game object, the position can be appended to the name of the game object. Position numbers are read top lef to bottom right. If the object was 2x2 and the item should appear in the bottom left corner it would look like this:

```
Initial Position: "bed_1" at position 3
```

## Inventory

The players inventory can hold up to 5 items. Items can be in the inventory when the game starts. Below is an example of starting the level with a key in your inentory. 
```
inventory:
    "key_3"
```

## Messages

Game messages can appear as a behavior event or when the game starts or ends. Messages can be up to 50 characters long. Every map can have an optional intro message defined as such:
```
intro message: "Welcome to the game. Try to escape!"
```