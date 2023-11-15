import numpy as np
import matplotlib.pyplot as plt

def gabor_filter(x, y, sigma, theta, frequency, phi):
    x_prime = x * np.cos(theta) + y * np.sin(theta)
    y_prime = -x * np.sin(theta) + y * np.cos(theta)
    
    envelope = np.exp(-((x_prime**2 + y_prime**2) / sigma**2) / 2)
    carrier = np.cos(2 * np.pi * frequency * x_prime + phi)
    gabor = envelope * carrier

    return (envelope, carrier, gabor)

def show(item, cmap):
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')

    ax.plot_surface(x, y, item, cmap=cmap)
    ax.set_axis_off()

    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Amplitude')
    ax.set_xlim([-5 * np.pi, 5 * np.pi])
    ax.set_ylim([-5 * np.pi, 5 * np.pi])

    plt.show()


if __name__ == "__main__":
    sigma = 2
    theta = np.pi / 4
    frequency = 0.4
    phi = np.pi / 3

    x = np.linspace(-2 * np.pi, 2 * np.pi, 1000)
    y = np.linspace(-2 * np.pi, 2 * np.pi, 1000)
    x, y = np.meshgrid(x, y)

    (envelope, carrier, gabor) = gabor_filter(x, y, sigma, theta, frequency, phi)

    color_maps = [
        'plasma',
        'inferno',
        'magma',
        'cividis',
        'coolwarm',
        'viridis'
    ]
    for cmap in color_maps:
        show(gabor, cmap)