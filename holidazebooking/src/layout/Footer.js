/** @format */

import React from 'react';
import { Container } from 'react-bootstrap';

function AppFooter() {
	return (
		<footer className="App-footer bg-dark text-light py-3">
			<Container className="text-center">
				<p className="mb-0">
					&copy; {new Date().getFullYear()} Holidaze. All rights reserved.
				</p>
			</Container>
		</footer>
	);
}

export default AppFooter;
