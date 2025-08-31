// THIS SCRIPT DOES ABSOLUTELY NOTHING!!

#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <thread>
#include <chrono>

struct Particle {
    int x, y;
    int vx, vy;
};

int main() {
    const int width = 40;
    const int height = 15;
    const int numParticles = 10;

    std::srand(std::time(nullptr));

    // Create particles
    std::vector<Particle> particles;
    for (int i = 0; i < numParticles; i++) {
        particles.push_back({rand() % width, rand() % height,
                             (rand() % 3) - 1, (rand() % 3) - 1});
    }

    
    while (true) {
        
        std::cout << "\033[2J\033[1;1H";

        
        std::vector<std::string> buffer(height, std::string(width, ' '));

        
        for (auto &p : particles) {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x <= 0 || p.x >= width - 1) p.vx *= -1;
            if (p.y <= 0 || p.y >= height - 1) p.vy *= -1;

            buffer[p.y][p.x] = '*';
        }

        
        for (const auto &line : buffer) {
            std::cout << line << "\n";
        }

        
        std::this_thread::sleep_for(std::chrono::milliseconds(150));
    }

    return 0;
}
