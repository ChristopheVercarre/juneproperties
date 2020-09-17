# frozen_string_literal: true

module Views
  module Apartments
    class GoogleMapComponent < ApplicationComponent
      attr_reader :apartment

      def initialize(apartment: nil)
      end
    end
  end
end
