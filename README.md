<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">Shortly</h3>

  <p align="center">
    Web service to convert long URLs to short one.
    <br />
    <br />
    <a href="https://sh.anksus.me/">View Demo</a>
    ·
    <a href="https://github.com/anksus/shortly/issues">Report Bug</a>
    ·
    <a href="https://github.com/anksus/shortly/issues">Request Feature</a>
  </p>
</p>


<!-- ABOUT THE PROJECT -->
## About The Project

![](https://anksus.me/_next/image?url=%2Fstatic%2Fimages%2Fshortly.png&w=640&q=75)

### Built With

* [NextJs](https://nextjs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Ant Design](https://ant.design)
* [NextAuth](https://next-auth.js.org/)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Anksus/shortly
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create env file for credentials in the root folder.
   ```sh
   touch .env.local
   ```
4. Paste all the required credentials in .env file
   ```sh
   MONGODB_URI=SOME_SECRET
   GOOGLE_ID=SOME_SECRET
   GOOGLE_SECRET=SOME_SECRET
   NEXTAUTH_URL=http://localhost:3000/
   ```
5. Run it
   ```sh
   npm run dev
   ```

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


