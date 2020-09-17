# frozen_string_literal: true

module Views
  module Apartments
    class AmenitiesComponent < ApplicationComponent
      attr_reader :apartment

      def initialize(apartment: nil)
        @apartment = {
          amenities: [
            {amenity: "car_parking", text: "Car Parking"},
            {amenity: "couples", text: "Couples"},
            {amenity: "garden", text: "Garden"},
            {amenity: "ghost", text: "Ghost"},
            {amenity: "pool_billiards", text: "Pool Billiards"},
            {amenity: "sheets", text: "Sheets"},
            {amenity: "towels", text: "Towels"}
          ]
        }
      end

      def social_share_title
        apartment_title
      end

      def social_share_keywords
        apartment_keywords
      end
    end
  end
end
