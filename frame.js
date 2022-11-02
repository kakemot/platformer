class Frame {
    constructor(keyframe) {
        this.isKeyframe = keyframe;
        this.value = [];
        this.value[0] = 90; //left upperarm
        this.value[1] = 90; //left lowerarm
        this.value[2] = 90; //left upperleg
        this.value[3] = 90; //left lowerleg
        this.value[4] = 0; //left foot
        this.value[5] = 90; //head
        this.value[6] = 90; //body
        this.value[7] = 90; //right upperarm
        this.value[8] = 90; //right lowerarm
        this.value[9] = 90; //right upperleg
        this.value[10] = 90; //right lowerleg
        this.value[11] = 0; //right foot
    }
}
