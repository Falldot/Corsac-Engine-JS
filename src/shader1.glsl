// атрибут, который будет получать данные из буфера
attribute vec2 a_position;

uniform vec2 u_resolution;

// все шейдеры имеют функцию main
void main() {

    // преобразуем положение в пикселях к диапазону от 0.0 до 1.0
    vec2 zeroToOne = a_position / u_resolution;

    // преобразуем из 0->1 в 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;

    // преобразуем из 0->2 в -1->+1 (пространство отсечения)
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace, 0, 1);
}