angular.module('aqu-scape').factory('UndoRedoTool', [function() {

    var actionStack = [];
    var currentUndoIndex = 0;
    var actionTypeMove = 'move', actionTypeAdd = 'add';

    return {
        moveAction: function() {
            return actionTypeMove;
        },
        addAction: function() {
            return actionTypeAdd;
        },
        reset: function() {
            actionStack = [];
            currentUndoIndex = 0;
        },
        undo: function() {
            if (actionStack.length < 1 || currentUndoIndex < 0) return;
            if (actionStack[currentUndoIndex].action === 'move') {
                actionStack[currentUndoIndex].item.position = actionStack[currentUndoIndex].previousPosition;
                if (actionStack[currentUndoIndex].item.text) actionStack[currentUndoIndex].item.text.position = actionStack[currentUndoIndex].previousPosition;
            } else {
                actionStack[currentUndoIndex].item.opacity = '0';
                if (actionStack[currentUndoIndex].item.text) actionStack[currentUndoIndex].item.text.opacity = '0';
            }        
            currentUndoIndex -= 1;
            paper.view.draw();
        },
        redo: function() {
            if (actionStack.length < 1 || !actionStack[currentUndoIndex + 1]) return;
            currentUndoIndex = currentUndoIndex + 1;
            if (actionStack[currentUndoIndex].action === 'move') {
                actionStack[currentUndoIndex].item.position = actionStack[currentUndoIndex].newPosition;
                if (actionStack[currentUndoIndex].item.text) actionStack[currentUndoIndex].item.text.position = actionStack[currentUndoIndex].newPosition;
            } else {
                actionStack[currentUndoIndex].item.opacity = '1';
                if (actionStack[currentUndoIndex].item.text) actionStack[currentUndoIndex].item.text.opacity = '1';
            }
            paper.view.draw();
        },
        pushToActionStack(item, action, previousPosition, newPosition) {
            actionStack.push({item: item, action: action, previousPosition: previousPosition, newPosition: newPosition});
            currentUndoIndex = actionStack.length -1;
        },
        clearRedoStack: function() {
            for (; currentUndoIndex < actionStack.length - 1;) {
                actionStack.pop();
            }
        }
    }

}]);
